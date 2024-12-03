package com.financial.service;

import com.financial.model.GeneratedPayment;

import java.util.UUID;

public interface IGeneratedPayment {
    GeneratedPayment getLastPendingPaymentByType(UUID loanId, String paymentType);
}
