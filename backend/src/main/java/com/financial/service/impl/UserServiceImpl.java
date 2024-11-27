package com.financial.service.impl;

import com.financial.exception.NotFoundException;
import com.financial.model.User;
import com.financial.repository.IUserRepository;
import com.financial.service.IUserService;
import com.financial.utils.UUIDUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final IUserRepository userRepository;

    @Override
    public void validateIdentity(Boolean identity, UUID userId) {
        userRepository.isVerified(identity, userId);
    }

    @Override
    public User findUserByIdOrDni(String userIdOrDni) {
        if (UUIDUtils.looksLikeUUID(userIdOrDni)) {
            return findUserById(UUID.fromString(userIdOrDni));
        } else {
            return userRepository.findUserByDni(userIdOrDni)
                    .orElseThrow(() -> new NotFoundException(String.format("User not found with id: %s", userIdOrDni)));
        }
    }

    @Override
    public User findUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(String.format("User not found with id: %s", id)));
    }

}
