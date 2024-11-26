package com.financial.exception;

import java.util.UUID;

public class LoanDocumentationNotFoundException extends RuntimeException {

    public LoanDocumentationNotFoundException(UUID loanId, UUID loanDocumentationId) {
        super(String.format("Loan documentation with id %s not found for loan with id %s", loanDocumentationId, loanId));
    }

}
