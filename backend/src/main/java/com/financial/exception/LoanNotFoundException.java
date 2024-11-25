package com.financial.exception;

public class LoanNotFoundException extends RuntimeException{
    private static final Integer STATUS_CODE = 404;

    public LoanNotFoundException(String message) {
        super(message);
    }

    public Integer getStatusCode() {
        return STATUS_CODE;
    }
}
