package com.financial.controller;


import com.financial.config.CurrentUser;
import com.financial.dto.request.auth.LoginRequestDto;
import com.financial.dto.request.auth.RegisterRequestDto;
import com.financial.dto.response.auth.AuthResponseDto;
import com.financial.model.User;
import com.financial.service.AuthService;
import com.financial.service.IEmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final IEmailService emailService;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login (@Valid @RequestBody LoginRequestDto dto) {
        return ResponseEntity.ok().body(authService.login(dto));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register (@Valid @RequestBody RegisterRequestDto dto) {
        AuthResponseDto response = authService.register(dto);
        //emailService.sendWelcomeEmail(dto.getEmail());
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/check-login")
    public ResponseEntity<AuthResponseDto> checkLogin (@CurrentUser User user) {

        return ResponseEntity.ok().body(authService.checkLogin(user.getEmail()));
    }
}
