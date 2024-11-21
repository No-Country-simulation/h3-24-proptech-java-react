package com.financial.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record PasswordRecoveryRequestDTO(
        @NotBlank(message = "Email must not be blank")
        @Email(message = "Please provide a valid email address")
        String email) {
}
