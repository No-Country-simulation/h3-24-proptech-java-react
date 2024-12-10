package com.financial.service;

import com.financial.model.GeneratedPayment;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface IGeneratedPayment {
    GeneratedPayment getLastPendingPaymentByType(UUID loanId, String paymentType);
    void updatePaymentStatus(UUID loanId, Integer installmentNumber);
    void cancelPendingPayments();
}
