package com.financial.service.impl;

import com.financial.config.mapper.PaymentMapper;
import com.financial.exception.LoanNotFoundException;
import com.financial.exception.NotFoundException;
import com.financial.exception.PaymentNotFoundException;
import com.financial.model.Loan;
import com.financial.model.Payment;
import com.financial.model.enums.LateFeeRate;
import com.financial.model.enums.PaymentStatus;
import com.financial.repository.ILoanRepository;
import com.financial.repository.IPaymentRepository;
import com.financial.service.IPaymentService;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Log4j2
@Service
public class PaymentServiceImpl implements IPaymentService {
    private final ILoanRepository loanRepository;
    private final IPaymentRepository paymentRepository;

    public PaymentServiceImpl(IPaymentRepository paymentRepository, PaymentMapper paymentMapper, ILoanRepository loanRepository) {
        this.paymentRepository = paymentRepository;
        this.loanRepository = loanRepository;
    }

    @Transactional
    @Override
    public void createPayment(UUID loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new LoanNotFoundException("Loan with ID " + loanId + " not found"));

        BigDecimal requestedAmount = loan.getRequestedAmount();     // Monto solicitado
        BigDecimal interestRate = loan.getInterestRate();           // Tasa de interés
        int termMonths = loan.getTermMonths();                      // Término en meses
        BigDecimal monthlyQuota = loan.getMonthlyQuota();           // Cuota mensual (ya calculada)
        LocalDate firstDueDate = LocalDate.now().withDayOfMonth(1).plusMonths(1); // Primer día del mes siguiente

        List<Payment> payments = new ArrayList<>();
        for (int month = 1; month <= termMonths; month++) {
            LocalDate dueDate = firstDueDate.plusMonths(month);  // Fecha estimada de pago por mes 1 de cada mes siguiente
            Payment payment = new Payment();
            payment.setLoan(loan);
            payment.setAmount(monthlyQuota);
            payment.setDueDate(dueDate);                         // Fecha estimada para la cuota
            payment.setPayLimitDate(dueDate.withDayOfMonth(10)); // Fecha límite para pagar sin interés
            payment.setPaymentDate(null);                        // Inicialmente sin pago realizado
            payment.setStatus(PaymentStatus.PENDING);            // Estado inicial del pago
            payment.setLateFee(BigDecimal.ZERO);                 // No hay interés por atraso al principio
            payment.setLateFeeApplied(false);                    // No se aplica el interés aún
            payment.setInterestRate(interestRate);               // Tasa de interés para el pago
            payment.setPaidOnTime(false);                        // Asumimos que no se pagó a tiempo aún
            payment.setInstallmentNumber(month);                 // Asignar el número de la cuota
            payments.add(payment);
            paymentRepository.saveAll(payments);
        }
        //return payments;
    }

    /**
     * Procesa el pago de una cuota de un préstamo, calculando los intereses por mora si corresponde,
     * y actualizando el estado del pago.
     *
     * <p>Este método verifica si el pago fue realizado a tiempo y, en caso de no ser así, calcula el
     * interés por mora basado en la cantidad de días de retraso. El interés es aplicado solo si no ha
     * sido aplicado previamente.</p>
     *
     * @param loanId El identificador único del préstamo.
     * @param installmentNumber El número de la cuota del préstamo a la cual se refiere el pago.
     *
     * @throws PaymentNotFoundException Si no se encuentra el pago correspondiente al préstamo y la cuota especificados.
     */
    @Transactional
    public void processPayment(UUID loanId, int installmentNumber) {
//        // Fecha de pago simulada (primer día del mes de marzo)
//        LocalDate paymentDate = LocalDate.now().withDayOfMonth(1).plusMonths(4);

        LocalDate paymentDate = LocalDate.now();  // Fecha de pago actual

        // Buscar el pago correspondiente al préstamo y número de cuota
        Payment payment = paymentRepository.findByLoan_LoanIdAndInstallmentNumber(loanId, installmentNumber)
                .orElseThrow(() -> new PaymentNotFoundException("Payment for loan " + loanId + " and quota " + installmentNumber + " not found"));

        payment.setPaymentDate(paymentDate);

        // Fecha límite de pago (fecha de vencimiento de la cuota)
        LocalDate payLimit = payment.getDueDate();
        // Verificar si el pago se realizó dentro del plazo (1 al 10 del mes)
        boolean paidOnTime = !paymentDate.isAfter(payLimit);
        payment.setPaidOnTime(paidOnTime);

        // Si no se pagó a tiempo, aplicar el interés por mora
        if (!paidOnTime) {
            if (!payment.isLateFeeApplied()) {
                // Calcular días de atraso
                int lateDays = (int) ChronoUnit.DAYS.between(payLimit, paymentDate);

                // Obtener la tasa de interés por mora en función de los días de atraso
                BigDecimal lateFeeRate = LateFeeRate.getLateFeeRate(lateDays);

                // Calcular el monto del interés por mora
                BigDecimal lateFee = payment.getAmount().multiply(lateFeeRate).setScale(2, RoundingMode.HALF_UP);

                // Guardar el interés en el pago
                payment.setLateFee(lateFee);
                payment.setLateFeeApplied(true);
            }
        } else {
            // Si el pago se realizó a tiempo, no aplicar interés por mora
            payment.setLateFee(BigDecimal.ZERO);
            payment.setLateFeeApplied(false);
        }

        // Actualizar el estado del pago (PAID o LATE)
        payment.setStatus(paidOnTime ? PaymentStatus.PAID : PaymentStatus.LATE);
        paymentRepository.save(payment);
    }

    @Transactional
    @Scheduled(cron = "0 0 3 11 * ?") // Se ejecuta a las 3:00 AM el día 11 de cada mes
    public void markLatePayments() {
        LocalDate dueDate = LocalDate.now();

        // Buscar todas las cuotas vencidas y no pagadas
        List<Payment> payments = paymentRepository.findByDueDateBeforeAndPaymentDateIsNullAndStatusNot(dueDate, PaymentStatus.PENDING);

        for (Payment payment : payments) {
            if (payment.getDueDate().isBefore(dueDate)) {
                payment.setStatus(PaymentStatus.MOROSA);
                paymentRepository.save(payment);
            }
        }
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public List<Payment> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }

    @Override
    public List<Payment> getPaymentsByLoan(UUID loanId) {
        return paymentRepository.findByLoan_LoanId(loanId);
    }

    @Override
    public Payment updatePaymentStatus(UUID paymentId, PaymentStatus status) {
        Optional<Payment> paymentOptional = paymentRepository.findById(paymentId);
        if (paymentOptional.isPresent()) {
            Payment payment = paymentOptional.get();
            payment.setStatus(status);
            return paymentRepository.save(payment);
        } else {
            throw new NotFoundException("Payment not found with ID: " + paymentId);
        }
    }

}
