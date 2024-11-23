package com.financial.service;

import com.financial.model.User;

import java.util.UUID;

public interface IUserService {
    void validateIdentity(Boolean identity,UUID userId);
    User findUserById(UUID id);
}
