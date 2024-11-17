package com.financial.dto.request.auth;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class LoginRequestDto {
    @Email(message = "invalid email entered")
    @NotBlank(message = "Email must be required")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "The password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    )
    private String password;
}
