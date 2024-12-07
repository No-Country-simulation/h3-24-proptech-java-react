package com.financial.exception;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class PaymentNotFoundException extends RuntimeException {
    private Integer statusCode = 404;

    public PaymentNotFoundException(String message) {
        super(message);
    }

    public PaymentNotFoundException(UUID paymentId) {
        super(String.format("Payment with ID %s not found", paymentId.toString()));
    }
}
