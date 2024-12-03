package com.financial.dto.response.payment;

import com.financial.model.CloudFile;
import com.financial.model.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record ResponsePaymentDTO(
    UUID paymentId,
    UUID loanId,
    BigDecimal amount,
    LocalDate dueDate,
    LocalDate payLimitDate,
    LocalDate paymentDate,
    PaymentStatus status,
    BigDecimal lateFee,
    boolean lateFeeApplied,
    BigDecimal interestRate,
    boolean paidOnTime,
    int installmentNumber,
    CloudFile cloudFile
) {
}
