package com.financial.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailRequestDto(@NotBlank(message = "El email no puede estar vacío")
                              @Email(message = "El email debe ser válido")
                              String email) {
}
