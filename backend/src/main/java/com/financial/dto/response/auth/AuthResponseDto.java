package com.financial.dto.response.auth;

public record AuthResponseDto(
    UserResponseDto user,
    String token
) {
}
