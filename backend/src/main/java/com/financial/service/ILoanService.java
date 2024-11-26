package com.financial.service;

import com.financial.dto.request.loan.RequestCreateLoanDTO;
import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.request.loan.RequestRefinanceLoanDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;
import com.financial.model.Loan;

import java.math.BigDecimal;
import java.util.List;
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

    String preApproveLoan(UUID loanId);

    /**
     * Marca un préstamo como eliminado (delete lógico).
     *
     * @param loanId Identificador único del préstamo.
     * @throws IllegalArgumentException si el préstamo no existe.
     */
    void deleteLoan(UUID loanId);

    /**
     * Obtiene una lista de todos los préstamos activos.
     * Filtra los préstamos que no han sido eliminados lógicamente (deleted = false).
     *
     * @return Lista de objetos {@link Loan} que representan los préstamos activos.
     */
    List<Loan> getAllActiveLoans();
}
