package com.financial.dto.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"message"})
public record TokenValidationResponseDTO(String message) {

}
