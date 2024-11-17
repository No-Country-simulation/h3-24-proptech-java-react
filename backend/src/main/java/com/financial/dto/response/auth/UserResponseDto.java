package com.financial.dto.response.auth;

import com.financial.model.Role;

import java.util.Set;
import java.util.UUID;

public record UserResponseDto(
        UUID userId,
        String email,
        String name,
        String lastname,
        String dni,
        Set<Role> roles
) {
}
