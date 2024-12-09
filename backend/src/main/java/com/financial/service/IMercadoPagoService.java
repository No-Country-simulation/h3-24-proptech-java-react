package com.financial.service;

import com.financial.dto.response.mp.PreferenceResponseDTO;

import java.util.Map;
import java.util.UUID;

public interface IMercadoPagoService {

    PreferenceResponseDTO createPreference(UUID paymentId);

    Map<String, Object> getMetadataFromMpPayment(Long mpPaymentId);

}
