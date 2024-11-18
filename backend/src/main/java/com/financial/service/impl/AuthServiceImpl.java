package com.financial.service.impl;

import com.financial.config.mapper.UserMapper;
import com.financial.config.security.JwtService;
import com.financial.dto.request.auth.LoginRequestDto;
import com.financial.dto.request.auth.RegisterRequestDto;
import com.financial.dto.response.TokenValidationResponse;
import com.financial.dto.response.auth.AuthResponseDto;
import com.financial.dto.response.auth.RoleResponseDto;
import com.financial.dto.response.auth.UserResponseDto;
import com.financial.exception.BadRequestException;
import com.financial.exception.EmailServiceException;
import com.financial.exception.NotFoundException;
import com.financial.model.Role;
import com.financial.model.User;
import com.financial.repository.IRoleRepository;
import com.financial.repository.IUserRepository;
import com.financial.service.AuthService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
        userFound = userRepository.findUserByDni(dto.getDni());
        if(userFound.isPresent()) throw new BadRequestException(String.format("dni is already registered: %s",dto.getDni()));
        String roleName = dto.getUserType() ? "ROLE_COMPRADOR" : "ROLE_INVERSOR";
        Role role = roleRepository.findRoleByName(roleName).orElseThrow(() -> new NotFoundException(String.format("Role not found with name %s",roleName)));

        User newUser = new User();
        newUser.setEmail(dto.getEmail());
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        newUser.setDni(dto.getDni());
        newUser.setName(dto.getName());
        newUser.setLastname(dto.getLastname());
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
//        UserResponseDto userR = mapper.toUserResponseDTO(user);
        Set<RoleResponseDto> roles = user.getRoles().stream()
                .map(r-> new RoleResponseDto(r.getRoleId(),r.getName()))
                .collect(Collectors.toSet());
        UserResponseDto userR = new UserResponseDto(user.getUserId(),user.getEmail(),user.getName(),user.getLastname(),user.getDni(),roles);
        String token = jwtService.generateToken(user);
        return new AuthResponseDto(userR,token);
    }

    public Optional<String> getUserNameByEmail(String email) {
        Optional<User> userOptional = userRepository.findUserByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return Optional.ofNullable(user.getName());
        }
        return Optional.empty();
    }

    @Transactional
    public void updatePasswordToken(String token, String email) {
        Optional<User> optionalUsuario = userRepository.findUserByEmail(email);
        if (optionalUsuario.isPresent()) {
            User user = optionalUsuario.get();
            user.setResetPasswordToken(token);
            user.setTokenExpiryDate(LocalDateTime.now().plusMinutes(10));
            userRepository.save(user);
        } else {
            try {
                throw new EmailServiceException("User not found with email: " + email);
            } catch (EmailServiceException e) {
                throw new RuntimeException("Error processing password recovery request", e);
            }
        }
    }

    public User get(String resetPasswordToken) {
        if (resetPasswordToken == null) {
            try {
                throw new EmailServiceException("Token not provided.");
            } catch (EmailServiceException e) {
                throw new RuntimeException("Error al finalizar el restablecimiento de contraseña. Solicite un nuevo token.", e);
            }
        }
        Optional<User> optionalUsuario = userRepository.findByResetPasswordToken(resetPasswordToken);
        if (optionalUsuario.isPresent()) {
            return optionalUsuario.get();
        } else {
            try {
                throw new EmailServiceException("Invalid or expired token.");
            } catch (EmailServiceException e) {
                throw new RuntimeException("Error al finalizar el restablecimiento de contraseña. Solicite un nuevo token.", e);
            }
        }
    }

    @Transactional
    public void updatePassword(User user, String password) {
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        user.setResetPasswordToken(null);
        userRepository.save(user);
    }

    public TokenValidationResponse validateResetToken(String resetPasswordToken) {
        if (resetPasswordToken == null || resetPasswordToken.trim().isEmpty()) {
            throw new EmailServiceException("El token no fue proporcionado.");
        }
        Optional<User> optionalUser = userRepository.findByResetPasswordToken(resetPasswordToken);
        if (optionalUser.isEmpty()) {
            throw new EmailServiceException("El token es inválido o no se encuentra registrado.");
        }
        User user = optionalUser.get();
        if (user.getTokenExpiryDate() != null && user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new EmailServiceException("El token ha expirado. Solicite uno nuevo.");
        }
        return new TokenValidationResponse("Token válido. Puede proceder a restablecer su contraseña.");
    }
}
