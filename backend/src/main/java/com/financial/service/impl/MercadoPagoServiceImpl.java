package com.financial.service.impl;

import com.financial.dto.response.mp.PreferenceResponseDTO;
import com.financial.exception.PaymentNotFoundException;
import com.financial.exception.ProfileNotFoundException;
import com.financial.model.Loan;
import com.financial.model.Payment;
import com.financial.model.Profile;
import com.financial.model.User;
import com.financial.repository.IPaymentRepository;
import com.financial.service.IMercadoPagoService;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.common.PhoneRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MercadoPagoServiceImpl implements IMercadoPagoService {
    private final IPaymentRepository paymentRepository;

    @Value("${mercadopago.access_token}")
    private String accessToken;

    @Value("${mercadopago.success_callback_url:http://localhost:5173/mp-success}")
    private String successCallbackUrl;

    @Value("${mercadopago.failure_callback_url:http://localhost:5173/mp-failure}")
    private String failureCallbackUrl;

    @Value("${mercadopago.pending_callback_url:http://localhost:5173/mp-pending}")
    private String pendingCallbackUrl;

    @Override
    public PreferenceResponseDTO createPreference(UUID paymentId) {
        try {
            MercadoPagoConfig.setAccessToken(accessToken);
            return tryCreatePreference(paymentId);
        } catch (MPException | MPApiException e) {
            throw new RuntimeException(e);
        }
    }

    private PreferenceResponseDTO tryCreatePreference(UUID paymentId) throws MPException, MPApiException {
        Payment payment = paymentRepository.findById(paymentId).orElseThrow(() -> new PaymentNotFoundException(paymentId));
        Loan loan = payment.getLoan();
        User user = loan.getUser();
        Profile profile = user.getProfile();
        if (profile == null) {
            throw new ProfileNotFoundException("User with ID " + user.getUserId() + " does NOT have a profile");
        }
        String title = String.format("Payment N° %d for loan %s", payment.getInstallmentNumber(), loan.getLoanId().toString());
        String description = String.format("Monthly quota with status %s and amount $%s.", payment.getStatus(), payment.getAmount());
        PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                .id(paymentId.toString())
                .title(title)
                .description(description)
                .categoryId("quota")
                .quantity(1)
                .currencyId("ARS")
                .unitPrice(payment.getAmount())
                .build();
        List<PreferenceItemRequest> items = new ArrayList<>();
        items.add(itemRequest);
        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(items)
                .metadata(new HashMap<>() {{
                    put("payment_id", paymentId.toString());
                }})
                .notificationUrl()
                .payer(PreferencePayerRequest.builder()
                        .name(user.getName())
                        .surname(user.getLastname())
                        .email(user.getEmail())
                        .phone(PhoneRequest.builder()
                                .areaCode("54")
                                .number(profile.getMobilePhone())
                                .build())
                        .identification(IdentificationRequest.builder()
                                .type("DNI")
                                .number(user.getDni())
                                .build()
                        ).build())
                .backUrls(PreferenceBackUrlsRequest.builder()
                        .success(successCallbackUrl)
                        .failure(failureCallbackUrl)
                        .pending(pendingCallbackUrl)
                        .build())
                .autoReturn("approved")
                .build();
        PreferenceClient client = new PreferenceClient();
        Preference preference = client.create(preferenceRequest);
        return new PreferenceResponseDTO(preference.getId());
    }

    @Override
    public UUID getPaymentIdFromMpPayment(Long mpPaymentId) {
        try {
            MercadoPagoConfig.setAccessToken(accessToken);
            return tryGetPaymentIdFromMpPayment(mpPaymentId);
        } catch (MPException | MPApiException e) {
            throw new RuntimeException(e);
        }
    }

    private UUID tryGetPaymentIdFromMpPayment(Long mpPaymentId) throws MPException, MPApiException {
        PaymentClient client = new PaymentClient();
        com.mercadopago.resources.payment.Payment mpPayment = client.get(mpPaymentId);
        String paymentIdString = (String) mpPayment.getMetadata().get("payment_id");
        return UUID.fromString(paymentIdString);
    }

}
