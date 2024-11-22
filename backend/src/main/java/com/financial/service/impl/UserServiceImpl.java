package com.financial.service.impl;

import com.financial.model.User;
import com.financial.service.IUserService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements IUserService {
    @Override
    public void validateIdentity(Boolean identity) {

    }

    @Override
    public User findUserById(UUID id) {
        return null;
    }
}
