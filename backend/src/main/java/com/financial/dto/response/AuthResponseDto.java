package com.financial.dto.response;

public record AuthResponseDto(
    UserResponseDto user,
    String token
) {
}
