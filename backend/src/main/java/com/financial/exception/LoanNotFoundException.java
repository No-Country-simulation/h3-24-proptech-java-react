package com.financial.exception;

import java.util.UUID;

public class LoanNotFoundException extends RuntimeException {
    private static final Integer STATUS_CODE = 404;

    public LoanNotFoundException(UUID loanId) {
        super(String.format("Loan with id %s not found", loanId));
    }

    public LoanNotFoundException(String message) {
        super(message);
    }

    public Integer getStatusCode() {
        return STATUS_CODE;
    }

}
