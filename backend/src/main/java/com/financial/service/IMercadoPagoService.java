package com.financial.service;

import com.mercadopago.resources.preference.Preference;

import java.util.UUID;

public interface IMercadoPagoService {

    Preference createPreference(UUID paymentId);

    UUID getPaymentIdFromMpPayment(Long mpPaymentId);

}
