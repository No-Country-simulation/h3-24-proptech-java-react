package com.financial.service.impl;

import com.financial.exception.PaymentNotFoundException;
import com.financial.model.GeneratedPayment;
import com.financial.model.Payment;
import com.financial.model.enums.PaymentStatus;
import com.financial.model.enums.PaymentType;
import com.financial.repository.IGeneratedPaymentRepository;
import com.financial.service.IGeneratedPayment;
import com.financial.service.IPaymentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class GeneratedPaymentService implements IGeneratedPayment {
    private final IGeneratedPaymentRepository generatedPaymentRepository;
    private final IPaymentService iPaymentService;
    public GeneratedPaymentService(IGeneratedPaymentRepository generatedPaymentRepository, IPaymentService iPaymentService) {
        this.generatedPaymentRepository = generatedPaymentRepository;
        this.iPaymentService = iPaymentService;
    }

    @Override
    public GeneratedPayment getLastPendingPaymentByType(UUID loanId, String paymentType) {
        Pageable pageable = PageRequest.of(0, 1);  // Solo resultado
        Page<GeneratedPayment> payments = generatedPaymentRepository.findTopByLoanIdAndPaymentTypeAndStatusOrderByInstallmentNumberAsc(loanId, paymentType, pageable);
        if (payments.hasContent()) {
            return payments.getContent().getFirst();  // Devuelve el primer pago si existe
        } else {
            throw new RuntimeException("No pending payment found");
        }
    }

    @Transactional
    public GeneratedPayment updatePaymentStatus(UUID loanId, Integer installmentNumber) {
        GeneratedPayment payment = generatedPaymentRepository.findByLoanIdAndInstallmentNumber(loanId, installmentNumber)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found for the given loanId and installmentNumber"));

        generatedPaymentRepository.delete(payment);
        Payment res = iPaymentService.getPaymentById(payment.getPaymentId());
        BigDecimal originalAmount = payment.getAmount();  // Recuperamos el monto original
        res.setAmount(originalAmount);                     // Restauramos el monto original
        res.setStatus(PaymentStatus.PENDING);              // Estado sigue siendo pendiente si no se pagó
        res.setLateFee(BigDecimal.ZERO);                   // Sin mora
        res.setLateFeeApplied(false);                      // No se aplica mora si no se pagó
        res.setGenerated(false);                           // Marcamos como no generado
        iPaymentService.savePayment(res);

        return null;  // Ya no es necesario devolver nada, ya que la fila ha sido eliminada.
    }
}
