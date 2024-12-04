package com.financial.controller.mp;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Component
@Slf4j
public class MercadoPagoSignatureFilter extends OncePerRequestFilter {
    private static final String X_SIGNATURE_HEADER = "x-signature";
    private static final String X_REQUEST_ID_HEADER = "x-request-id";

    @Value("${mercadopago.secret_key}")
    private String mpSecretKey;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        // Verificar que la ruta coincida
        if (MercadoPagoWebhookController.WEBHOOK_PATH.equals(request.getRequestURI())) {
            log.info("Starting MP request signature verification...");
            String xSignature = request.getHeader(X_SIGNATURE_HEADER);
            String xRequestId = request.getHeader(X_REQUEST_ID_HEADER);
            String dataId = request.getParameter("data.id");
            if (xSignature == null || xRequestId == null || dataId == null) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Signature verification failed");
                return;
            }
            try {
                if (!verifySignature(xSignature, xRequestId, dataId)) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid signature");
                    return;
                }
            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Signature verification error");
                return;
            }
        }

        // Si la verificación es exitosa, continúa con la cadena de filtros
        filterChain.doFilter(request, response);
    }

    private boolean verifySignature(String xSignature, String xRequestId, String dataId) throws NoSuchAlgorithmException, InvalidKeyException {
        // Extract signature components
        String ts = extractValue(xSignature, "ts");
        String hash = extractValue(xSignature, "v1");
        if (ts == null || hash == null) {
            return false;
        }

        // Generate manifest
        String manifest = String.format("id:%s;request-id:%s;ts:%s;", dataId, xRequestId, ts);

        // Calculate HMAC
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(mpSecretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256Hmac.init(secretKey);
        byte[] hmacBytes = sha256Hmac.doFinal(manifest.getBytes(StandardCharsets.UTF_8));
        String calculatedHash = bytesToHex(hmacBytes);

        // Compare hashes
        return calculatedHash.equals(hash);
    }

    private String extractValue(String signature, String key) {
        if (signature == null) {
            return null;
        }
        String[] parts = signature.split(",");
        for (String part : parts) {
            String[] keyValue = part.trim().split("=");
            if (keyValue.length == 2 && keyValue[0].trim().equals(key)) {
                return keyValue[1].trim();
            }
        }
        return null;
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

}
