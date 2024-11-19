package com.financial.service;

public interface IEmailService {
    void sendPasswordRecoveryEmail(String email, String resetPasswordLink);
    void sendEmail(String toMessage, String toEmail, String userName, String senderName);
    void sendWelcomeEmail(String toEmail);
    void sendPasswordChangeConfirmationEmail(String email);
    //1. Método para enviar un correo de aprobación de préstamo
    void sendLoanApprovalEmail(String toEmail, String userName, String loanDetails);
    //2. Método para enviar un correo de rechazo de préstamo
    void sendLoanRejectionEmail(String toEmail, String userName, String reason);
    //3. Método para enviar un correo de solicitud de préstamo
    void sendLoanRequestEmail(String toEmail, String userName, String loanRequestDetails);
    // 4. Nuevo método para enviar el correo de activación de cuenta
    void sendAccountActivationEmail(String toEmail, String activationToken);
}
