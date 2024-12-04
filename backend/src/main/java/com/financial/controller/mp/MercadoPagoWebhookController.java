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
            String mpPaymentId = (String) notificationDto.data().get("id");
            UUID paymentId = mercadoPagoService.getPaymentIdFromMpPayment(Long.valueOf(mpPaymentId));
            paymentService.updatePaymentStatus(paymentId, PaymentStatus.PAID);
            log.info("Payment {} updated to status {}", paymentId, PaymentStatus.PAID);
        }
        return ResponseEntity.ok().build();
    }

}
