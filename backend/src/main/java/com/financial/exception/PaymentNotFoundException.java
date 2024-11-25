package com.financial.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentNotFoundException extends RuntimeException {
    private Integer statusCode = 404;

    public PaymentNotFoundException(String message) {
        super(message);
    }
}
