package com.financial.controller;


import com.financial.config.CurrentUser;
import com.financial.dto.request.auth.LoginRequestDto;
import com.financial.dto.request.auth.RegisterRequestDto;
import com.financial.dto.response.auth.AuthResponseDto;
import com.financial.model.User;
import com.financial.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login (@Valid LoginRequestDto dto) {
        return ResponseEntity.ok().body(authService.login(dto));
    }

    @PostMapping("register")
    public ResponseEntity<AuthResponseDto> register (@Valid RegisterRequestDto dto) {
        return ResponseEntity.status(201).body(authService.register(dto));
    }

    @GetMapping("check-login")
    public ResponseEntity<AuthResponseDto> checkLogin (@CurrentUser User user) {

        return ResponseEntity.ok().body(authService.checkLogin(user.getEmail()));
    }
}
