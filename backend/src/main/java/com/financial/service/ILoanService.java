package com.financial.service;

import com.financial.dto.request.loan.RequestCreateLoanDTO;
import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.request.loan.RequestRefinanceLoanDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;

import java.math.BigDecimal;
import java.util.UUID;

public interface ILoanService{
    /**
     * Crea un nuevo préstamo basado en los datos proporcionados.
     *
     * @param request Detalles del préstamo a crear ({@link RequestCreateLoanDTO}).
     * @return Información del préstamo creado ({@link ResponseLoanDTO}).
     * @throws IllegalArgumentException si el usuario asociado no existe.
     */
    ResponseLoanDTO createLoan(UUID userId, RequestLoanSimulationDTO request);
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
    BigDecimal calculateLoan(BigDecimal amount, Integer term);

    /**
     * Actualiza el estado de un préstamo existente.
     *
     * @param loanId Identificador único del préstamo.
     * @param status Nuevo estado del préstamo.
     */
    void updateLoanStatus(UUID loanId, String status);

    /**
     * Refinancia un préstamo existente con nuevos valores de monto, plazo y tasa de interés.
     *
     * @param loanId ID único del préstamo a refinanciar.
     * @param request Datos del refinanciamiento ({@link RequestRefinanceLoanDTO}).
     * @return Detalles del préstamo refinanciado ({@link ResponseLoanDTO}).
     * @throws IllegalArgumentException si el préstamo no es válido para refinanciar.
     */
    ResponseLoanDTO refinanceLoan(UUID loanId, RequestRefinanceLoanDTO request);
}
