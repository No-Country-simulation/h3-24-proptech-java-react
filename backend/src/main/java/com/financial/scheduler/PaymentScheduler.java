package com.financial.scheduler;

import com.financial.dto.response.PaymentDetailsResponseDTO;
import com.financial.model.GeneratedPayment;
import com.financial.model.Loan;
import com.financial.model.Payment;
import com.financial.model.enums.PaymentStatus;
import com.financial.model.enums.PaymentType;
import com.financial.repository.IGeneratedPaymentRepository;
import com.financial.repository.ILoanRepository;
import com.financial.repository.IPaymentRepository;
import com.financial.service.IPaymentService;
import lombok.extern.java.Log;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Log
@Component
public class PaymentScheduler {
    private final IGeneratedPaymentRepository generatedPaymentRepository;
    private final IPaymentService paymentService;
    private final IPaymentRepository paymentRepository;
    private final ILoanRepository loanRepository;
    public PaymentScheduler(IGeneratedPaymentRepository generatedPaymentRepository, IPaymentService paymentService, IPaymentRepository paymentRepository, ILoanRepository loanRepository) {
        this.generatedPaymentRepository = generatedPaymentRepository;
        this.paymentService = paymentService;
        this.paymentRepository = paymentRepository;
        this.loanRepository = loanRepository;
    }
    
    /**
     * Procesa los pagos mensuales de los préstamos a las 2:00 AM del primer día de cada mes.
     */
    @Transactional
    //@Scheduled(cron = "0 0 2 1 * ?")
    @Scheduled(fixedRate = 400000)
    public void processMonthlyPayments() {
        List<Loan> loans = loanRepository.findAll();
        for (Loan loan : loans) {
            List<Payment> pendingPayments = paymentRepository.findPendingPaymentsByLoanId(loan.getLoanId());  // Buscar todas las cuotas pendientes
            if (!pendingPayments.isEmpty()) {  // Buscar la primera cuota pendiente que no ha sido generada
                Payment nextPayment = null;
                for (Payment payment : pendingPayments) {
                    if (!payment.isGenerated()) {
                        nextPayment = payment;
                        nextPayment.setGenerated(true);
                        paymentRepository.save(nextPayment);
                        break;
                    }
                }
                if (nextPayment != null) {
                    PaymentDetailsResponseDTO paymentDetails = paymentService.generatePaymentForMonth(loan.getLoanId(), nextPayment.getInstallmentNumber()
                    );
                    GeneratedPayment generatedPayment = GeneratedPayment.builder()
                            .loanId(loan.getLoanId())                                               // ID del préstamo
                            .paymentId(nextPayment.getPaymentId())                                  // ID del pago
                            .installmentNumber(nextPayment.getInstallmentNumber())                  // Número de cuota
                            .amount(paymentDetails.amount())                                        // Monto
                            .totalAmountWithInterests(paymentDetails.totalAmountWithInterests())    // Monto total
                            .dueDate(paymentDetails.dueDate())                                      // Fecha de vencimiento
                            .payLimitDate(paymentDetails.payLimitDate())                            // Fecha límite de pago
                            .status(PaymentStatus.PENDING.name())                                   // Estado "PENDING"
                            .paymentType(PaymentType.ON_TIME.name())
                            .lateFee(paymentDetails.lateFee())
                            .remainingBalance(loan.getRemainingBalance())
                            .totalAmount(loan.getTotalAmount())
                            .requestedAmount(loan.getRequestedAmount())// Interés por mora
                            .build();
                    generatedPaymentRepository.save(generatedPayment);
                    //TODO: Implementar el envío de notificaciones
                }
            }
        }
    }

    /**
     * Marca los pagos vencidos como morosos el día 11 de cada mes a las 3:00 AM.
     */
    @Transactional
    //@Scheduled(cron = "0 0 3 11 * ?")
    @Scheduled(fixedRate = 70000)
    public void markLatePayments() {
        LocalDate dueDate = LocalDate.now();
        List<Payment> payments = paymentRepository.findByDueDateBeforeAndPaymentDateIsNullAndStatusNot(dueDate, PaymentStatus.PENDING);
        for (Payment payment : payments) {
            if (payment.getDueDate().isBefore(dueDate)) {
                payment.setStatus(PaymentStatus.MOROSA);
                paymentRepository.save(payment);
            }
        }
    }

    @Transactional
    @Scheduled(fixedRate = 405000)
    public void processMonthlyPaymentsAdvance() {
        List<Loan> loans = loanRepository.findAll();
        for (Loan loan : loans) {
            List<Payment> pendingPayments = paymentRepository.findPendingPaymentsByLoanId(loan.getLoanId()); // Buscar las cuotas pendientes del préstamo
            if (!pendingPayments.isEmpty()) {
                Payment nextPayment = null;
                for (Payment payment : pendingPayments) { // Primera cuota pendiente y no generada
                    if (!payment.isGenerated()) {
                        nextPayment = payment;
                        break;
                    }
                }

                if (nextPayment == null) {
                    continue;
                }

                PaymentDetailsResponseDTO paymentDetails = paymentService.generatePaymentForMonthAdvance(
                        loan.getLoanId(), nextPayment.getInstallmentNumber());

                GeneratedPayment generatedPayment = GeneratedPayment.builder()
                        .loanId(loan.getLoanId())                                               // ID del préstamo
                        .paymentId(nextPayment.getPaymentId())                                  // ID del pago
                        .installmentNumber(nextPayment.getInstallmentNumber())                  // Número de cuota
                        .amount(paymentDetails.amount())                                        // Monto base
                        .totalAmountWithoutInterests(paymentDetails.totalAmountWithDiscount())  // Monto total con descuento
                        .dueDate(paymentDetails.dueDate())                                      // Fecha de vencimiento
                        .payLimitDate(paymentDetails.payLimitDate())                            // Fecha límite de pago
                        .status(PaymentStatus.PENDING.name())                                   // Estado "PAID_ADVANCE"
                        .lateFee(BigDecimal.ZERO)                                               // Sin mora para pagos adelantados
                        .paymentType(PaymentType.ADVANCE.name())
                        .discountPercentage(paymentDetails.discountAmount())
                        .remainingBalance(loan.getRemainingBalance())
                        .totalAmount(loan.getTotalAmount())
                        .requestedAmount(loan.getRequestedAmount())
                        .build();

                nextPayment.setGenerated(true);
                paymentRepository.save(nextPayment);
                generatedPaymentRepository.save(generatedPayment);
                //TODO: Implementar el envío de notificaciones
            }
        }
    }
}
