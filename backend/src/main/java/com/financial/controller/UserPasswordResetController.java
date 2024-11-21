package com.financial.controller;

import com.financial.dto.request.PasswordRecoveryRequestDTO;
import com.financial.dto.request.PasswordResetRequestDTO;
import com.financial.dto.response.PasswordRecoveryResponseDTO;
import com.financial.dto.response.TokenValidationResponseDTO;
import com.financial.model.User;
import com.financial.service.IEmailService;
import com.financial.service.impl.AuthServiceImpl;
import jakarta.validation.Valid;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserPasswordResetController {
    private final IEmailService emailService;
    private final AuthServiceImpl authService;

    @Value("${frontend.url}")
    private String frontendUrl;

    public UserPasswordResetController(IEmailService emailService, AuthServiceImpl authService) {
        this.emailService = emailService;
        this.authService = authService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<PasswordRecoveryResponseDTO> requestPasswordReset(@Valid @RequestBody PasswordRecoveryRequestDTO request) {
        String token = RandomString.make(45);
        authService.updatePasswordToken(token, request.email());
        String resetPasswordLink = String.format("%s/reset-password?token=%s", frontendUrl, token);
        emailService.sendPasswordRecoveryEmail(request.email(), resetPasswordLink);
        return ResponseEntity.ok(new PasswordRecoveryResponseDTO("Email de recuperación de contraseña enviado."));
    }

    @GetMapping("/reset-password/token")
    public ResponseEntity<TokenValidationResponseDTO> validateResetToken(@RequestParam(value = "token") String token) {
        return ResponseEntity.ok(authService.validateResetToken(token));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<PasswordRecoveryResponseDTO> resetPassword(@Valid @RequestBody PasswordResetRequestDTO request) {
        User user = authService.get(request.token());
        authService.updatePassword(user, request.password());
        emailService.sendPasswordChangeConfirmationEmail(user.getEmail());
        return ResponseEntity.ok(new PasswordRecoveryResponseDTO("Contraseña cambiada exitosamente. Ahora puedes iniciar sesión."));
    }
}
