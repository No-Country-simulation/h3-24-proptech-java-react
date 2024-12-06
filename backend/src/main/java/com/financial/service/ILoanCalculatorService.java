package com.financial.service;

import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.response.loan.ResponseLoanCalculationsDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;

public interface ILoanCalculatorService {

    /**
     * Realiza la simulación de un préstamo.
     *
     * @param requestLoan Los parámetros de entrada para la simulación.
     * @return Los detalles de la simulación.
     */
    ResponseLoanSimulationDTO simulateLoan(RequestLoanSimulationDTO requestLoan);

    ResponseLoanCalculationsDTO loanCalculations(RequestLoanSimulationDTO requestLoan);

}
