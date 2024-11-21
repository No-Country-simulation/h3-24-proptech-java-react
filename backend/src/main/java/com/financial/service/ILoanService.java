package com.financial.service;

import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;

import java.math.BigDecimal;

public interface ILoanService{
    /**
     * Obtiene detalles de un préstamo.
     */
    void getLoanDetails();

    /**
     * Realiza la simulación de un préstamo.
     * @param request Los parámetros de entrada para la simulación.
     * @return Los detalles de la simulación.
     */
    ResponseLoanSimulationDTO simulateLoan(RequestLoanSimulationDTO requestLoan);

    /**
     * Calcula la cuota mensual de un préstamo.
     * @param amount Monto del préstamo.
     * @param rate Tasa de interés anual.
     * @param term Plazo en meses.
     * @return La cuota mensual calculada.
     */
    BigDecimal calculateLoan(BigDecimal amount, int term);
}
