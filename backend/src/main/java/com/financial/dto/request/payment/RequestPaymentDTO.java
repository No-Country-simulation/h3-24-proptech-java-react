package com.financial.dto.request.payment;

import com.financial.model.enums.PaymentStatus;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record RequestPaymentDTO(@NotNull(message = "Amount is mandatory.")
                                @Positive(message = "Amount must be greater than zero.")
                                BigDecimal amount,

                                @NotNull(message = "Due date is mandatory.")
                                @FutureOrPresent(message = "Due date must be in the present or future.")
                                LocalDate dueDate,

                                @NotNull(message = "Pay limit date is mandatory.")
                                @FutureOrPresent(message = "Pay limit date must be in the present or future.")
                                LocalDate payLimitDate,

                                @Null(message = "Payment date should be null when creating a payment.")
                                LocalDate paymentDate,

                                @NotNull(message = "Status is mandatory.")
                                PaymentStatus status,

                                @PositiveOrZero(message = "Late fee must be zero or positive.")
                                BigDecimal lateFee,

                                @NotNull(message = "Late fee applied flag is mandatory.")
                                Boolean lateFeeApplied,

                                @NotNull(message = "Interest rate is mandatory.")
                                @DecimalMin(value = "0.0", inclusive = false, message = "Interest rate must be greater than zero.")
                                BigDecimal interestRate,

                                @NotNull(message = "Paid on time flag is mandatory.")
                                Boolean paidOnTime) {
}
