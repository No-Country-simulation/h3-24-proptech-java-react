package com.financial.service;

import com.financial.dto.request.EmailDetails;

public interface IEmailService {
    void sendPasswordRecoveryEmail(String email, String resetPasswordLink);
    void sendEmail(String subject, EmailDetails emailDetails, String redirectLink);
    void sendPasswordChangeConfirmationEmail(String email);
    // Método para enviar un correo de aprobación de préstamo
    void sendLoanStatusUpdateEmail(String recipientEmail, String userName, String loanStatus);
    // Método para enviar un correo de rechazo de préstamo
    void sendLoanRejectionEmail(String toEmail, String userName, String status, String message);
    // Nuevo método para enviar el correo de activación de cuenta
    void sendAccountActivationEmail(String toEmail);
}
