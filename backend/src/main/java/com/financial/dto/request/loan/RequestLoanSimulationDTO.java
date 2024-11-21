package com.financial.dto.request.loan;

import com.financial.dto.customValidation.ValidLoanRate;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record RequestLoanSimulationDTO(
        @NotNull
        BigDecimal requestedAmount,
        @NotNull
        @ValidLoanRate
        int termMonths
) {}