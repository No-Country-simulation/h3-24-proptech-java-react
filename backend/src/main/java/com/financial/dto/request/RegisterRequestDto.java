package com.financial.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequestDto {
    @Email(message = "invalid email entered")
    @NotBlank
    private String email;


}
