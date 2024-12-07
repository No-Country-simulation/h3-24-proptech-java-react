package com.financial.dto.request.loan;

import com.financial.dto.customValidation.loanStatus.ValidLoanStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record UpdateStatusLoanRequestDTO(
        @NotBlank(message = "The loan id cannot be blank")
        UUID loanId,

        @NotNull(message = "The status cannot be null")
        @ValidLoanStatus(message = "Invalid status")
        String status
) {
}
