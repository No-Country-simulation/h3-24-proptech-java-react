package com.financial.model.enums;

/**
 * Enum que representa los estados posibles de un pago.
 * PENDING: Pago pendiente de ser procesado.
 * APPROVED: Pago aprobado y procesado correctamente.
 * REFUSED: Pago rechazado por algún motivo.
 * LATE: Pago realizado después de la fecha de vencimiento.
 * PAID: Pago completado a tiempo.
 * MOROSA: Pago en mora por no ser realizado dentro del plazo.
 */
public enum PaymentStatus {
    PENDING,
    APPROVED,
    REFUSED,
    LATE,
    PAID,
    MOROSA,
    PAID_ADVANCE
}
