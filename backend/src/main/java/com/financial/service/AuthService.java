package com.financial.service;

import com.financial.dto.request.auth.LoginRequestDto;
import com.financial.dto.request.auth.RegisterRequestDto;
import com.financial.dto.response.auth.AuthResponseDto;

public interface AuthService {
    AuthResponseDto login(LoginRequestDto dto);
    AuthResponseDto register(RegisterRequestDto dto);
    AuthResponseDto checkLogin(String email);
}
