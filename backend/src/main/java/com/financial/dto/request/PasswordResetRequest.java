package com.financial.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PasswordResetRequest(
        @NotBlank(message = "El token no debe estar vacío")
        String token,

        @NotBlank(message = "La contraseña no debe estar vacía")
        @Size(min = 8, max = 12, message = "La contraseña debe tener entre 8 y 12 caracteres")
        @Pattern(regexp = ".*[A-Z].*", message = "La contraseña debe contener al menos una letra mayúscula")
        @Pattern(regexp = ".*[a-z].*", message = "La contraseña debe contener al menos una letra minúscula")
        @Pattern(regexp = ".*\\d.*", message = "La contraseña debe contener al menos un número")
        @Pattern(regexp = ".*[@$!%*?&].*", message = "La contraseña debe contener al menos un carácter especial de @$!%*?&")
        String password
) {
}
