package com.financial.service.impl;

import com.financial.config.mapper.UserMapper;
import com.financial.config.security.JwtService;
import com.financial.dto.request.auth.LoginRequestDto;
import com.financial.dto.request.auth.RegisterRequestDto;
import com.financial.dto.response.auth.AuthResponseDto;
import com.financial.dto.response.auth.UserResponseDto;
import com.financial.exception.BadRequestException;
import com.financial.model.User;
import com.financial.repository.IRoleRepository;
import com.financial.repository.IUserRepository;
import com.financial.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserMapper mapper;
    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public AuthResponseDto login(LoginRequestDto dto) {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        } catch (Exception e) {
            throw new BadRequestException("Invalid username or password");
        }
        User user = userRepository.findUserByEmail(dto.getEmail())
                .orElseThrow(() -> new BadRequestException(String.format("User not found with email",dto.getEmail())));
        return generateResponse(user);
    }

    @Override
    public AuthResponseDto register(RegisterRequestDto dto) {
        return null;
    }

    @Override
    public AuthResponseDto checkLogin(String email) {
        return null;
    }


    private AuthResponseDto generateResponse(User user) {
        UserResponseDto userR = mapper.toDto(user);
        String token = jwtService.generateToken(user);
        return new AuthResponseDto(userR,token);
    }
}
