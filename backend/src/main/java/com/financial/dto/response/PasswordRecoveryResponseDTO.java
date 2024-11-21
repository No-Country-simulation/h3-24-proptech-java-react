package com.financial.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"message", "token"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public record PasswordRecoveryResponseDTO(String message, String token) {
    public PasswordRecoveryResponseDTO(String message) {
        this(message, null);
    }
}
