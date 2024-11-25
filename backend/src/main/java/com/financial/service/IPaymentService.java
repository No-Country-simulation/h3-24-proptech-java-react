package com.financial.service;

import com.financial.dto.request.payment.RequestPaymentDTO;
import com.financial.model.Payment;
import com.financial.model.enums.PaymentStatus;

import java.util.List;
import java.util.UUID;

public interface IPaymentService {
    /**
     * Crea un nuevo pago asociado a un préstamo.
     *
     * @param payment Detalles del pago a crear.
     * @param loanId
     * @return El objeto {@link Payment} creado con el ID asignado.
     */
    void createPayment(UUID loanId);

    /**
     * Obtiene todos los pagos registrados en el sistema.
     *
     * @return Lista de todos los pagos.
     */
    List<Payment> getAllPayments();

    /**
     * Obtiene los pagos filtrados por su estado.
     *
     * @param status El estado de los pagos a obtener.
     * @return Lista de pagos con el estado especificado.
     */
    List<Payment> getPaymentsByStatus(PaymentStatus status);

    /**
     * Obtiene los pagos asociados a un préstamo específico.
     *
     * @param loanId El ID del préstamo.
     * @return Lista de pagos asociados al préstamo.
     */
    List<Payment> getPaymentsByLoan(UUID loanId);

    /**
     * Actualiza el estado de un pago.
     *
     * @param paymentId El ID del pago a actualizar.
     * @param status El nuevo estado del pago.
     * @return El objeto {@link Payment} con el estado actualizado.
     */
    Payment updatePaymentStatus(UUID paymentId, PaymentStatus status);

    void processPayment(UUID loanId, int installmentNumber);
}
