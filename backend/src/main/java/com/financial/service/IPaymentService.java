package com.financial.service;

import com.financial.dto.response.PaymentDetailsResponseDTO;
import com.financial.dto.response.PaymentResponseDTO;
import com.financial.model.Payment;
import com.financial.model.enums.PaymentStatus;

import java.util.List;
import java.util.UUID;

public interface IPaymentService {
    /**
     * Genera el cronograma de pagos para un préstamo aprobado.
     * Este método calcula las cuotas mensuales basadas en el monto solicitado,
     * la tasa de interés, y el plazo en meses del préstamo. Luego, crea los pagos
     * pendientes con sus respectivas fechas de vencimiento.
     *
     * @param loanId El ID del préstamo aprobado para el cual se generará el cronograma de pagos.
     */
    void createPaymentSchedule(UUID loanId);
    /**
     * Obtiene todos los pagos registrados en el sistema.
     *
     * @return Lista de todos los pagos.
     */
    List<Payment> getAllPayments();
    /**
     * Obtiene los pagos filtrados por su estado.
     *
     * @param status El estado de los pagos que se desean obtener (por ejemplo, PENDING, PAID).
     * @return Lista de pagos con el estado especificado.
     */
    List<Payment> getPaymentsByStatus(PaymentStatus status);
    /**
     * Obtiene los pagos asociados a un préstamo específico.
     *
     * @param loanId El ID único del préstamo.
     * @return Lista de pagos vinculados al préstamo indicado.
     */
    List<Payment> getPaymentsByLoan(UUID loanId);
    /**
     * Actualiza el estado de un pago existente.
     *
     * @param paymentId El ID del pago que se desea actualizar.
     * @param status El nuevo estado a asignar al pago (por ejemplo, PAID, REFUSED).
     * @return El objeto {@link Payment} con el estado actualizado.
     */
    Payment updatePaymentStatus(UUID paymentId, PaymentStatus status);
    /**
     * Procesa un pago específico asociado a un préstamo.
     *
     * @param loanId El ID del préstamo al que pertenece el pago.
     * @param installmentNumber El número de la cuota que se desea procesar.
     */
    void processPayment(UUID loanId, int installmentNumber);
    /**
     * Genera un pago para un mes específico basado en un préstamo y número de cuota.
     *
     * @param loanId El ID del préstamo al que pertenece el pago.
     * @param installmentNumber El número de la cuota que se generará.
     * @return Un {@link PaymentDetailsResponseDTO} con los detalles del pago generado.
     */
    PaymentDetailsResponseDTO generatePaymentForMonth(UUID loanId, int installmentNumber);

    /**
     * Procesa un pago anticipado para un préstamo.
     *
     * @param loanId El ID del préstamo al que pertenece el pago anticipado.
     * @param numberOfInstallments El número de cuotas que se adelantarán.
     */
    void processAdvancePayment(UUID loanId, int numberOfInstallments);

    /**
     * Genera un pago para un mes específico basado en un préstamo y número de cuota adelantado.
     *
     * @param loanId El ID del préstamo al que pertenece el pago.
     * @param installmentNumber El número de la cuota adelantada.
     * @return Un objeto {@link PaymentDetailsResponseDTO} con los detalles del pago generado.
     */
    PaymentDetailsResponseDTO generatePaymentForMonthAdvance(UUID loanId, int installmentNumber);

    /**
     * Obtiene las cuotas pendientes para un préstamo específico.
     *
     * @param loanId El ID del préstamo.
     * @param numberOfInstallments El número de cuotas pendientes que se desean obtener.
     * @return Lista de objetos {@link PaymentResponseDTO} que representan las cuotas pendientes.
     */
    List<PaymentResponseDTO> getPendingInstallments(UUID loanId, int numberOfInstallments);

    /**
     * Obtiene el último pago realizado para un préstamo específico.
     *
     * @param loanId El ID del préstamo.
     * @return Un objeto {@link PaymentResponseDTO} con los detalles del último pago realizado.
     */
    PaymentResponseDTO getLastPaidPayment(UUID loanId);

    /**
     * Obtiene los pagos pendientes asociados a un préstamo específico.
     *
     * @param loanId El ID del préstamo.
     * @return Lista de objetos {@link PaymentResponseDTO} con los pagos pendientes.
     */
    List<PaymentResponseDTO> getPendingPayments(UUID loanId);
}
