package com.financial.dto.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@JsonPropertyOrder({
        "loanId", "installmentNumber", "amount", "dueDate", "payLimitDate", "lateFee",
        "lateFeeStatus", "totalAmountWithInterests", "totalAmountWithDiscount",
        "discountAmount", "requestedAmount", "totalAmount", "remainingBalance"})
public record PaymentResponseDTO( UUID loanId,                        // loanId
                                  UUID paymentId,
                                  int installmentNumber,              // Número de cuota
                                  BigDecimal amount,                  // Monto total de la cuota
                                  LocalDate dueDate,                  // Fecha de vencimiento
                                  boolean paidOnTime,                 // Pagado a tiempo
                                  LocalDate payLimitDate,             // Fecha límite de pago
                                  BigDecimal lateFee,                 // Interés por mora
                                  String lateFeeStatus,               // Estado del interés por mora
                                  BigDecimal totalAmountWithInterests,// Monto total con intereses
                                  BigDecimal totalAmountWithDiscount, // Monto total con descuento
                                  BigDecimal discountAmount,          // Monto del descuento aplicado
                                  BigDecimal requestedAmount,         // Monto total solicitado
                                  BigDecimal totalAmount,             // Monto total
                                  BigDecimal remainingBalance         // Saldo restante
) {
}
