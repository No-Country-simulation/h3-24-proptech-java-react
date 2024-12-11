package com.financial.utils;

import org.springframework.beans.factory.annotation.Value;

public final class EmailMessageUtils {

    public static final String EMAIL_TITLE = "Problemas de documentación";
    public static final String MESSAGE_BODY = "Te informamos que luego de revisar la documentación adjunta, le pedimos que modifique los siguientes campos según se solicita en la página: ";
    public static final String CALL_TO_ACTION_MESSAGE = "Accede a tu cuenta aquí: ";
    public static final String REGISTRATION_CONFIRMATION_SUBJECT = "Gracias por registrarte en nuestro sitio.";
    public static final String PASSWORD_CHANGE_CONFIRMATION_SUBJECT = "Tu cambio de contraseña fue exitoso.";
    public static final String PASSWORD_RECOVERY_SUBJECT = "Password Recovery Request";
    public static final String SUPPORT_NAME = "Soporte";
    public static final String ADMIN_NAME = "Administración";
    public static final String WELCOME_TEAM_NAME = "Equipo de Bienvenida";
    public static final String PASSWORD_RECOVERY_TEMPLATE = "password-recovery";
    public static final String CONFIRMATION_TEMPLATE = "confirmation";
    public static final String LOAN_STATUS_NOTIFICATION_TEMPLATE = "loan-status-notification";
    public static final String DEFAULT_USER_NAME = "Usuario";
    private EmailMessageUtils() {
        throw new UnsupportedOperationException("Esta es una clase de utilidad y no debe ser instantiate.");
    }
}
