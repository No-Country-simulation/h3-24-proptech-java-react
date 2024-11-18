package com.financial.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"message", "token"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public record PasswordRecoveryResponse(String message, String token) {
    public PasswordRecoveryResponse(String message) {
        this(message, null);
    }
}
