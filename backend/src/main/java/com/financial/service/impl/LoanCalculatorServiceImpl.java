package com.financial.service.impl;

import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.response.loan.PaymentScheduleDTO;
import com.financial.dto.response.loan.ResponseLoanCalculationsDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;
import com.financial.model.enums.LoanRate;
import com.financial.service.ILoanCalculatorService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class LoanCalculatorServiceImpl implements ILoanCalculatorService {

    @Override
    public ResponseLoanSimulationDTO simulateLoan(RequestLoanSimulationDTO requestLoan) {
        MathContext mathContext = MathContext.DECIMAL128;
        var res = loanCalculations(requestLoan);
        // Generar el cronograma de pagos
        List<PaymentScheduleDTO> schedule = generatePaymentSchedule(res.totalPayment(), res.interestRate(), res.monthlyQuota(), res.termMonths(), mathContext);
        // Simulación de préstamo
        return new ResponseLoanSimulationDTO(res.monthlyQuota().setScale(2, RoundingMode.HALF_UP), res.totalPayment(), res.requestedAmount(), res.termMonths(), schedule);
    }

    @Override
    public ResponseLoanCalculationsDTO loanCalculations(RequestLoanSimulationDTO requestLoan) {
        MathContext mathContext = MathContext.DECIMAL128;
        BigDecimal amount = requestLoan.requestedAmount().setScale(2, RoundingMode.HALF_UP);
        int term = requestLoan.termMonths();
        BigDecimal monthlyQuota = calculateLoan(amount, term).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalPayment = monthlyQuota.multiply(BigDecimal.valueOf(term), mathContext).setScale(2, RoundingMode.HALF_UP);
        BigDecimal rate = LoanRate.getRateByMonths(term).setScale(6, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100), mathContext);
        return new ResponseLoanCalculationsDTO(monthlyQuota.setScale(2, RoundingMode.HALF_UP), totalPayment, amount, term, rate.setScale(2, RoundingMode.HALF_UP));
    }

    /**
     * Calcula la cuota mensual de un préstamo.
     *
     * @param amount Monto del préstamo.
     * @param term   Plazo en meses.
     * @return La cuota mensual calculada.
     */
    private BigDecimal calculateLoan(BigDecimal amount, Integer term) {
        // Obtener la tasa según los meses
        BigDecimal rate = LoanRate.getRateByMonths(term).setScale(6, RoundingMode.HALF_UP);
        return amount.multiply(rate).setScale(2, RoundingMode.HALF_UP);
    }

    private List<PaymentScheduleDTO> generatePaymentSchedule(BigDecimal totalPayment, BigDecimal monthlyRate, BigDecimal monthlyQuota, Integer term, MathContext mathContext) {
        List<PaymentScheduleDTO> schedule = new ArrayList<>();
        // Saldo inicial es el monto del préstamo - la primera cuota
        BigDecimal remainingBalance = totalPayment.subtract(monthlyQuota, mathContext).setScale(2, RoundingMode.HALF_UP);
        BigDecimal interest = monthlyRate.setScale(2, RoundingMode.HALF_UP);
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
