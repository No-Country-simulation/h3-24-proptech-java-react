package com.financial.service;

import com.financial.model.User;

import java.util.UUID;

public interface IUserService {
    void validateIdentity(Boolean identity);
    User findUserById(UUID id);
}
