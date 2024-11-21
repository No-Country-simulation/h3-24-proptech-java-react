package com.financial.service.impl;

import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.response.loan.PaymentScheduleDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;
import com.financial.model.enums.LoanRate;
import com.financial.service.ILoanService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class LoanServiceImpl implements ILoanService {

    @Override
    public void getLoanDetails() {
        // TODO: Implement this method
    }

    @Override
    public ResponseLoanSimulationDTO simulateLoan(RequestLoanSimulationDTO requestLoan) {
        MathContext mathContext = MathContext.DECIMAL128;

        BigDecimal amount = requestLoan.requestedAmount().setScale(2, RoundingMode.HALF_UP);
        int term = requestLoan.termMonths();

        // Obtener la tasa mensual directamente del enum para el término
        BigDecimal monthlyRate = LoanRate.getRateByMonths(term).setScale(6, RoundingMode.HALF_UP);

        // Cálculo de la cuota mensual
        BigDecimal monthlyQuota = calculateLoan(amount, term).setScale(2, RoundingMode.HALF_UP);

        // Cálculo del pago total
        BigDecimal totalPayment = monthlyQuota.multiply(BigDecimal.valueOf(term), mathContext).setScale(2, RoundingMode.HALF_UP);

        // Generar el cronograma de pagos
        List<PaymentScheduleDTO> schedule = generatePaymentSchedule(totalPayment, monthlyRate, monthlyQuota, term, mathContext);

        // Simulación de préstamo
        return new ResponseLoanSimulationDTO(monthlyQuota.setScale(2, RoundingMode.HALF_UP), totalPayment, amount, term, schedule);
    }

    @Override
    public BigDecimal calculateLoan(BigDecimal amount, int term) {
        // Obtener la tasa según los meses
        BigDecimal rate = LoanRate.getRateByMonths(term).setScale(6, RoundingMode.HALF_UP);
        return amount.multiply(rate).setScale(2, RoundingMode.HALF_UP);
    }

    private List<PaymentScheduleDTO> generatePaymentSchedule(BigDecimal totalPayment, BigDecimal monthlyRate, BigDecimal monthlyQuota, int term, MathContext mathContext) {
        List<PaymentScheduleDTO> schedule = new ArrayList<>();
        BigDecimal remainingBalance = totalPayment.subtract(monthlyQuota).setScale(2, RoundingMode.HALF_UP); // Saldo inicial es el monto del préstamo - la primera cuota

        BigDecimal interest = monthlyRate.multiply(BigDecimal.valueOf(100), mathContext).setScale(2, RoundingMode.HALF_UP);

        for (int i = 1; i <= term; i++) {
            // Crear un nuevo registro de pago para este mes, incluyendo el interés y el saldo restante
            schedule.add(new PaymentScheduleDTO(i, monthlyQuota.setScale(2, RoundingMode.HALF_UP), interest, remainingBalance.setScale(2, RoundingMode.HALF_UP)));

            // Restar la cuota completa del saldo restante
            remainingBalance = remainingBalance.subtract(monthlyQuota);

            // Si el saldo restante se vuelve negativo, ajustar a 0 para evitar saldos negativos
            if (remainingBalance.compareTo(BigDecimal.ZERO) < 0) {
                remainingBalance = BigDecimal.ZERO;
            }
        }
        return schedule;
    }
}
