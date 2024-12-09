package com.financial.controller.mp;

import com.financial.dto.request.mp.MercadoPagoPaymentNotificationDTO;
import com.financial.model.enums.PaymentStatus;
import com.financial.service.IMercadoPagoService;
import com.financial.service.IPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(MercadoPagoWebhookController.WEBHOOK_PATH)
@RequiredArgsConstructor
@Slf4j
public class MercadoPagoWebhookController {
    public static final String WEBHOOK_PATH = "/api/mp/webhooks/payment";
    private final IMercadoPagoService mercadoPagoService;
    private final IPaymentService paymentService;

    @PostMapping
    public ResponseEntity<Void> mpWebhookPayment(@RequestBody MercadoPagoPaymentNotificationDTO notificationDto) {
        if ("payment.created".equals(notificationDto.action())) {
            log.info("Payment processed from MP: {}", notificationDto.data());
            String mpPaymentId = (String) notificationDto.data().get("id");
            Map<String, Object> paymentMetadata = mercadoPagoService.getMetadataFromMpPayment(Long.valueOf(mpPaymentId));
            String loanId = paymentMetadata.get("loan_id").toString();
            int installmentNumber = Integer.parseInt(paymentMetadata.get("installment_number").toString());
            paymentService.processPayment(UUID.fromString(loanId), installmentNumber);
            log.info("Installment N° {} for loan {} set to status {}", installmentNumber, loanId, PaymentStatus.PAID);
        }
        return ResponseEntity.ok().build();
    }

}
