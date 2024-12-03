package com.financial.dto.request.loan;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;


public record RequestDeclinedLoanDTO(
        @NotNull(message = "Loan id no puede ser NULL")
        UUID loanId,

        @NotBlank(message = "El mensaje no puede estar vacío")
        String message
) {
}
