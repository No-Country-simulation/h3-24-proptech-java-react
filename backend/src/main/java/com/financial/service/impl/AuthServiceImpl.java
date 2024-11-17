package com.financial.service.impl;

import com.financial.config.mapper.UserMapper;
import com.financial.config.security.JwtService;
import com.financial.dto.request.auth.LoginRequestDto;
import com.financial.dto.request.auth.RegisterRequestDto;
import com.financial.dto.response.auth.AuthResponseDto;
import com.financial.dto.response.auth.UserResponseDto;
import com.financial.exception.BadRequestException;
import com.financial.exception.NotFoundException;
import com.financial.model.Role;
import com.financial.model.User;
import com.financial.repository.IRoleRepository;
import com.financial.repository.IUserRepository;
import com.financial.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
                .orElseThrow(() -> new NotFoundException(String.format("User not found with email: %s",dto.getEmail())));
        return generateResponse(user);
    }

    @Transactional
    @Override
    public AuthResponseDto register(RegisterRequestDto dto) {
        Optional<User> userFound = userRepository.findUserByEmail(dto.getEmail());
        if(userFound.isPresent()) throw new BadRequestException(String.format("Email is already registered: %s",dto.getEmail()));
        String roleName = dto.getUserType() ? "ROLE_COMPRADOR" : "ROLE_INVERSOR";
        Role role = roleRepository.findRoleByName(roleName).orElseThrow(() -> new NotFoundException(String.format("Role not found with name %s",roleName)));
        User newUser = mapper.toUser(dto);
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        newUser.getRoles().add(role);
        userRepository.save(newUser);
        return generateResponse(newUser);
    }

    @Override
    public AuthResponseDto checkLogin(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new NotFoundException(String.format("User not found with email: %s",email)));
        return generateResponse(user);
    }


    private AuthResponseDto generateResponse(User user) {
        UserResponseDto userR = mapper.toDto(user);
        String token = jwtService.generateToken(user);
        return new AuthResponseDto(userR,token);
    }
}
