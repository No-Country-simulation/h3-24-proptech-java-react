package com.financial.dto.request.mp;

import java.util.Map;

public record MercadoPagoPaymentNotificationDTO(
        Long id,
        String action,
        String api_version,
        Map<String, Object> data,
        String type,
        Long user_id
) {
}
