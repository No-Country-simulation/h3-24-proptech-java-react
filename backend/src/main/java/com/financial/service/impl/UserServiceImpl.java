package com.financial.service.impl;

import com.financial.config.mapper.UserMapper;
import com.financial.dto.response.auth.UserResponseDto;
import com.financial.exception.NotFoundException;
import com.financial.model.User;
import com.financial.repository.IUserRepository;
import com.financial.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final IUserRepository userRepository;
    private final UserMapper userMapper;
    @Override
    public void validateIdentity(Boolean identity,UUID userId) {
        userRepository.isVerified(identity,userId);
    }

    @Override
    public User findUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(String.format("User not found with id: %s",id)));
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        return userMapper.toUserResponseDTO(userRepository.findUsersPendingPreApproved());
    }

}
