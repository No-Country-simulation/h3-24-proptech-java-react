package com.financial.controller;

import com.financial.dto.request.PasswordRecoveryRequest;
import com.financial.dto.request.PasswordResetRequest;
import com.financial.dto.response.PasswordRecoveryResponse;
import com.financial.dto.response.TokenValidationResponse;
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
    public ResponseEntity<PasswordRecoveryResponse> requestPasswordReset(@Valid @RequestBody PasswordRecoveryRequest request) {
        String token = RandomString.make(45);
        authService.updatePasswordToken(token, request.email());
        String resetPasswordLink = String.format("%s/reset-password?token=%s", frontendUrl, token);
        emailService.sendPasswordRecoveryEmail(request.email(), resetPasswordLink);
        return ResponseEntity.ok(new PasswordRecoveryResponse("Email de recuperación de contraseña enviado."));
    }

    @GetMapping("/reset-password/token")
    public ResponseEntity<TokenValidationResponse> validateResetToken(@RequestParam(value = "token") String token) {
        return ResponseEntity.ok(authService.validateResetToken(token));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<PasswordRecoveryResponse> resetPassword(@Valid @RequestBody PasswordResetRequest request) {
        User user = authService.get(request.token());
        authService.updatePassword(user, request.password());
        emailService.sendPasswordChangeConfirmationEmail(user.getEmail());
        return ResponseEntity.ok(new PasswordRecoveryResponse("Contraseña cambiada exitosamente. Ahora puedes iniciar sesión."));
    }
}
