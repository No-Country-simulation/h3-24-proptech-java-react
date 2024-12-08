package com.financial.service.impl;

import com.financial.dto.request.EmailDetails;
import com.financial.exception.EmailServiceException;
import com.financial.model.enums.LoanStatus;
import com.financial.service.IEmailService;
import com.financial.utils.EmailMessageUtils;
import com.financial.utils.LoanStatusEmailUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.UnsupportedEncodingException;

import static com.financial.utils.EmailMessageUtils.*;

@Service
public class EmailServiceImpl implements IEmailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final AuthServiceImpl authService ;

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine, AuthServiceImpl authService) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
        this.authService  = authService ;
    }

    @Value("spring.mail.username")
    private String emailSender;
    @Value("${backend.url}")
    private String backendUrl;

    /**
     * Sends an email for password recovery.
     *
     * @param toEmail          The recipient's email address.
     * @param resetPasswordLink The link to reset the password.
     * @throws EmailServiceException if an error occurs while sending the email.
     */
    @Override
    public void sendPasswordRecoveryEmail(String toEmail, String resetPasswordLink) {
        try {
            String userName = getUserNameByEmail(toEmail);
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(emailSender, SUPPORT_NAME);
            helper.setTo(toEmail);
            helper.setSubject(PASSWORD_RECOVERY_SUBJECT);

            Context context = new Context();
            context.setVariable("resetPasswordLink", resetPasswordLink);
            context.setVariable("userName", userName);
            String htmlContent = templateEngine.process(PASSWORD_RECOVERY_TEMPLATE, context);

            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new EmailServiceException("Failed to send password recovery email", e);
        }
    }

    /**
     * Sends a generic email with the provided subject and content.
     *
     * @param subject    The subject of the email.
     * @param toEmail    The recipient's email address.
     * @param userName   The name of the user receiving the email.
     * @param senderName The name of the sender displayed in the email.
     * @throws EmailServiceException if an error occurs while sending the email.
     */
    @Override
    public void sendEmail(String subject, EmailDetails emailDetails, String redirectLink) {
        validateEmailParameters(emailDetails.toEmail(), subject, emailDetails.userName(), emailDetails.senderName());
        String emailTitle, messageBody, extraMessage, callToActionMessage = null;
        switch (subject) {
            case REGISTRATION_CONFIRMATION_SUBJECT:
                emailTitle = "Confirmación de Registro";
                messageBody = "Gracias por registrarte en Financia.al. Estamos encantados  e que formes parte de nuestra comunidad.";
                callToActionMessage = "Para completar tu registro y comenzar a disfrutar de nuestros servicios, por favor confirma tu dirección de correo electrónico haciendo clic en el siguiente enlace:";
                extraMessage = "Este paso nos permite garantizar la seguridad de tu cuenta y mantener una comunicación confiable contigo.";
                break;

            case PASSWORD_CHANGE_CONFIRMATION_SUBJECT:
                emailTitle = "Confirmación de Cambio de Contraseña";
                messageBody = "Tu contraseña ha sido actualizada con éxito en Financial Al.";
                extraMessage = "Si no solicitaste este cambio, por favor, contacta con nuestro soporte de inmediato.";
                break;

            default:
                throw new IllegalArgumentException("Tipo de email no soportado: " + subject);
        }
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(emailSender, emailDetails.senderName());
            helper.setTo(emailDetails.toEmail());
            helper.setSubject(subject);

            Context context = new Context();
            context.setVariable("emailTitle", emailTitle);
            context.setVariable("userName", emailDetails.userName());
            context.setVariable("messageBody", messageBody);
            context.setVariable("extraMessage", extraMessage);
            context.setVariable("callToActionMessage", callToActionMessage);
            context.setVariable("redirectLink", redirectLink);
            String htmlContent = templateEngine.process(CONFIRMATION_TEMPLATE, context);

            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e ) {
            throw new EmailServiceException("Failed to send password change confirmation email", e);
        }
    }

    @Override
    public void sendPasswordChangeConfirmationEmail(String toEmail) {
        String userName = getUserNameByEmail(toEmail);
        EmailDetails emailDetails = new EmailDetails(toEmail, userName, SUPPORT_NAME);
        sendEmail(PASSWORD_CHANGE_CONFIRMATION_SUBJECT, emailDetails, null);
    }

    @Async
    @Override
    public void sendLoanStatusUpdateEmail(String toEmail, String userName, String loanStatus) {
        String subject = LoanStatusEmailUtil.getSubjectForLoanStatus(LoanStatus.valueOf(loanStatus));
        validateEmailParameters(toEmail, loanStatus, userName, ADMIN_NAME);
        String emailTitle, messageBody, extraMessage, callToActionMessage = null;
        switch (loanStatus) {
            case "INITIATED":
                emailTitle = "Solicitud de préstamo";
                messageBody = "Te informamos que hemos recibido tu solicitud de préstamo en nuestro sistema.";
                extraMessage = "Nuestro equipo ya está evaluando los datos proporcionados y pronto recibirás novedades sobre el estado de tu solicitud.";
                callToActionMessage = "Si necesitas modificar o agregar información, puedes acceder a tu cuenta aquí:";
                break;

            case "PRE_APPROVED":
                emailTitle = "Tu préstamo ha sido preaprobado";
                messageBody = "¡Buenas noticias! Tu solicitud de préstamo, así como la información de tus garantes, han sido validadas exitosamente.";
                extraMessage = "Nuestro equipo se pondrá en contacto contigo pronto para coordinar los siguientes pasos. ";
                callToActionMessage = "Mientras tanto, puedes verificar el estado de tu solicitud aquí: ";
                break;

            case "APPROVED":
                emailTitle = "Tu préstamo ha sido aprobado";
                messageBody = "Nos complace informarte que tu préstamo ha sido aprobado. ";
                extraMessage = "En las próximas 24 a 48 horas, podrás acceder a tu cuenta para consultar la tabla de pagos y las fechas de vencimiento de tus cuotas.";
                callToActionMessage = "Accede aquí para más información:";
                break;

            case "REFUSED":
                emailTitle = "Regularización de pagos";
                messageBody = "Te recordamos que tu cuenta presenta una mora de 3 meses en el pago de las cuotas de tu préstamo.";
                extraMessage = "Es importante que regularices tu situación para evitar posibles acciones legales.";
                callToActionMessage = "Por favor, ingresá al sistema para acreditar del pago o contáctanos para analizar alternativas:";
                break;

            case "PENDING":
                emailTitle = "Próximo paso: Información de tus garantes";
                messageBody = "Nos complace informarte que tus datos han sido validados correctamente.";
                extraMessage = "Ahora necesitamos que completes la información de tus garantes para continuar con el proceso.";
                callToActionMessage = "Por favor, ingresa al siguiente enlace para proporcionar estos datos: ";
                break;

            default:
                throw new IllegalArgumentException("Tipo de email no soportado: " + loanStatus);
        }
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(emailSender, ADMIN_NAME);
            helper.setTo(toEmail);
            helper.setSubject(subject);

            Context context = new Context();
            context.setVariable("emailTitle", emailTitle);
            context.setVariable("userName", userName);
            context.setVariable("messageBody", messageBody);
            context.setVariable("extraMessage", extraMessage);
            context.setVariable("callToActionMessage", callToActionMessage);
            String htmlContent = templateEngine.process(LOAN_STATUS_NOTIFICATION_TEMPLATE, context);

            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e ) {
            throw new EmailServiceException("Failed to send password change confirmation email", e);
        }
    }

    @Async
    @Override
    public void sendLoanRejectionEmail(String toEmail, String userName, String loanStatus, String notification) {
        String subject = LoanStatusEmailUtil.getSubjectForLoanStatus(LoanStatus.valueOf(loanStatus));
        validateEmailParameters(toEmail, loanStatus, userName, ADMIN_NAME);
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(emailSender, ADMIN_NAME);
            helper.setTo(toEmail);
            helper.setSubject(subject);

            Context context = new Context();
            context.setVariable("emailTitle", EmailMessageUtils.EMAIL_TITLE);
            context.setVariable("userName", userName);
            context.setVariable("messageBody", EmailMessageUtils.MESSAGE_BODY);
            context.setVariable("extraMessage", notification);
            context.setVariable("callToActionMessage", EmailMessageUtils.CALL_TO_ACTION_MESSAGE);
            String htmlContent = templateEngine.process(LOAN_STATUS_NOTIFICATION_TEMPLATE, context);

            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e ) {
            throw new EmailServiceException("Failed to send password change confirmation email", e);
        }
    }

    @Override
    @Async
    public void sendAccountActivationEmail(String toEmail) {
        String userName = getUserNameByEmail(toEmail);
        String token = generateActivationToken(toEmail);
        String activationLink = String.format("%s/api/auth/activate?token=%s", backendUrl, token);
        EmailDetails emailDetails = new EmailDetails(toEmail, userName, WELCOME_TEAM_NAME);
        sendEmail(REGISTRATION_CONFIRMATION_SUBJECT, emailDetails, activationLink);
    }

    private String generateActivationToken(String email) {
        return authService.generateActivationToken(email);
    }

    private String getUserNameByEmail(String email) {
        return authService .getUserNameByEmail(email).orElse(DEFAULT_USER_NAME);
    }

    private void validateEmailParameters(String toEmail, String subject, String userName, String senderName) {
        if (toEmail == null || toEmail.isEmpty()) {
            throw new IllegalArgumentException("El correo del destinatario (toEmail) no debe ser nulo ni estar vacío.");
        }
        if (subject == null || subject.isEmpty()) {
            throw new IllegalArgumentException("El asunto del correo no debe ser nulo ni estar vacío.");
        }
        if (userName == null || userName.isEmpty()) {
            throw new IllegalArgumentException("El nombre de usuario no debe ser nulo ni estar vacío.");
        }
        if (senderName == null || senderName.isEmpty()) {
            throw new IllegalArgumentException("El nombre del remitente no debe ser nulo ni estar vacío.");
        }
    }
}