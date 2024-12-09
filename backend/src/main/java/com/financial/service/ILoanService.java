package com.financial.service;

import com.financial.dto.request.loan.*;
import com.financial.dto.response.loan.LoanDetailsResponseDTO;
import com.financial.dto.response.loan.LoanMovedToPendingResultDTO;
import com.financial.dto.response.loan.ResponseLoanAdminDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.model.Loan;

import java.util.List;
import java.util.UUID;

public interface ILoanService {

    List<ResponseLoanDTO> getLoansOfUser(UUID userId);

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
    LoanDetailsResponseDTO getLoanDetails(UUID loanId);

    LoanDetailsResponseDTO getLoan(UUID userId);

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
     * @param loanId  ID único del préstamo a refinanciar.
     * @param request Datos del refinanciamiento ({@link RequestRefinanceLoanDTO}).
     * @return Detalles del préstamo refinanciado ({@link ResponseLoanDTO}).
     * @throws IllegalArgumentException si el préstamo no es válido para refinanciar.
     */
    ResponseLoanDTO refinanceLoan(UUID loanId, RequestRefinanceLoanDTO request);

    /**
     * Cambia el estado de un préstamo.
     * Solo para el administrador
     *
     * @param dto .
     * @return Retorna un mensaje simple de confirmación.
     */
    String changeLoanStatus(UpdateStatusLoanRequestDTO dto);

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

    /**
     * FUNCION SOLO PARA EL ADMINISTRADOR
     * Busca todos los prestamos pendientes
     *
     * @return Detalles de los prestamos pendientes ({@link ResponseLoanDTO}).
     */
    List<ResponseLoanAdminDTO> getLoansByStatus(String status);

    List<ResponseLoanAdminDTO> getLoansByUserId(UUID userId);

    ResponseLoanAdminDTO updateLoanAdmin(UUID loanId, RequestLoanSimulationDTO dto);

    String preApprove(UUID loanId);

    String approve(UUID loanId);

    String declinedLoan(RequestDeclinedLoanDTO dto);

    /**
     * To set the loan to PENDING status, first the following conditions must be true:
     * <p>
     * - The user associated with this loan is verified.
     * - The user's monthly income it's at least 3 times the loan monthly quota.
     * - There's at least 2 guarantees.
     * - The holder and each guarantee have successfully uploaded all the required documents.
     * </p>
     */
    LoanMovedToPendingResultDTO setLoanToPendingStatus(UUID loanId);

}
