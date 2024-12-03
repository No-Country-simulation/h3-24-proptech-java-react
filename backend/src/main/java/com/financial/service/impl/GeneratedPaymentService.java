package com.financial.service.impl;

import com.financial.model.GeneratedPayment;
import com.financial.repository.IGeneratedPaymentRepository;
import com.financial.service.IGeneratedPayment;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GeneratedPaymentService implements IGeneratedPayment {
    private final IGeneratedPaymentRepository generatedPaymentRepository;
    public GeneratedPaymentService(IGeneratedPaymentRepository generatedPaymentRepository) {
        this.generatedPaymentRepository = generatedPaymentRepository;
    }

    @Override
    public GeneratedPayment getLastPendingPaymentByType(UUID loanId, String paymentType) {
        return generatedPaymentRepository.findTopByLoanIdAndPaymentTypeAndStatusOrderByInstallmentNumberAsc(
                loanId, paymentType);
    }
}
