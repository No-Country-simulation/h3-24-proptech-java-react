package com.financial.service;

import com.financial.dto.response.mp.PreferenceResponseDTO;

import java.util.UUID;

public interface IMercadoPagoService {
    PreferenceResponseDTO createPreference(UUID paymentId);
    UUID getPaymentIdFromMpPayment(Long mpPaymentId);
}
