package com.financial.dto.request.loan;

import java.math.BigDecimal;

public record RequestLoanSimulationDTO(BigDecimal requestedAmount,  // Monto solicitado
                                       int termMonths         // Plazo en meses
) {}