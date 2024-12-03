package com.financial.service;

import com.financial.dto.response.auth.UserResponseDto;
import com.financial.model.User;

import java.util.List;
import java.util.UUID;

public interface IUserService {

    void validateIdentity(Boolean identity, UUID userId);

    User findUserByIdOrDni(String userIdOrDni);

    User findUserById(UUID id);

    List<UserResponseDto> getAllUsers();

}
