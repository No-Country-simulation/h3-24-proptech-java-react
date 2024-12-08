package com.financial.service;

public interface IEmailService {
    void sendPasswordRecoveryEmail(String email, String resetPasswordLink);
    void sendEmail(String toMessage, String toEmail, String userName, String senderName);
    void sendWelcomeEmail(String toEmail);
    void sendPasswordChangeConfirmationEmail(String email);
    // Método para enviar un correo de aprobación de préstamo
    void sendLoanStatusUpdateEmail(String recipientEmail, String userName, String loanStatus);
    // Método para enviar un correo de rechazo de préstamo
    void sendLoanRejectionEmail(String toEmail, String userName, String status, String message);
    // Nuevo método para enviar el correo de activación de cuenta
    //void sendAccountActivationEmail(String toEmail);
}
