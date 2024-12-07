package com.financial.utils;

public final class EmailMessageUtils {

    public static final String EMAIL_TITLE = "Problemas de documentación";
    public static final String MESSAGE_BODY = "Te informamos que luego de revisar la documentación adjunta, le pedimos que modifique los siguientes campos según se solicita en la página: ";
    public static final String CALL_TO_ACTION_MESSAGE = "Accede a tu cuenta aquí: ";

    private EmailMessageUtils() {
        throw new UnsupportedOperationException("Esta es una clase de utilidad y no debe ser instantiate.");
    }
}
