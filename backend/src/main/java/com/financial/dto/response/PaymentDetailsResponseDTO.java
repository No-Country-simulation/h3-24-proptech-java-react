package com.financial.dto.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO (Data Transfer Object) que representa los detalles del pago de una cuota de préstamo, incluyendo
 * información sobre el monto, la fecha de vencimiento y el estado del interés por mora.
 * El orden de los campos en el JSON de salida será especificado por la anotación @JsonPropertyOrder.
 *
 * @param loanId El identificador único del préstamo (tipo UUID).
 * @param installmentNumber El número de la cuota que se está procesando.
 * @param amount El monto total de la cuota a pagar (sin incluir intereses, si los hay).
 * @param dueDate La fecha de vencimiento de la cuota.
 * @param lateFee El monto del interés por mora, si es que se aplicó. Si no se aplicó, será 0.
 * @param lateFeeStatus El estado del interés por mora, que puede ser "APPLIED" (aplicado) o "NOT_APPLIED" (no aplicado).
 * @param totalAmountWithInterests El monto total de la cuota incluyendo intereses por mora.
 */
@JsonPropertyOrder({"loanId", "installmentNumber", "amount", "dueDate", "payLimitDate", "lateFee", "lateFeeStatus", "totalAmountWithInterests"})
public record PaymentDetailsResponseDTO(
        UUID loanId,                          // El identificador único del préstamo (tipo UUID).
        int installmentNumber,                // El número de la cuota que se está procesando.
        BigDecimal amount,                    // El monto total de la cuota a pagar (sin incluir intereses, si los hay).
        LocalDate dueDate,                    // La fecha de vencimiento de la cuota.
        LocalDate payLimitDate,               // La fecha límite para el pago (por ejemplo, entre el 1 y el 10 de cada mes).
        BigDecimal lateFee,                   // El monto del interés por mora si es que se aplicó, si no, será 0.
        String lateFeeStatus,                 // El estado del interés por mora, que puede ser "APPLIED" (aplicado) o "NOT_APPLIED" (no aplicado).
        BigDecimal totalAmountWithInterests,  // El monto total de la cuota incluyendo intereses por mora.
        BigDecimal totalAmountWithDiscount,    // El monto total de la cuota incluyendo descuento por adelanto.
        BigDecimal discountAmount
) {}
