package com.financial.repository;

import com.financial.model.Payment;
import com.financial.model.enums.PaymentStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IPaymentRepository extends JpaRepository<Payment, UUID> {
    /**
     * Obtiene todos los pagos que tienen un estado específico.
     *
     * @param status El estado del pago (por ejemplo, PENDING, PAID, etc.).
     * @return Una lista de pagos con el estado indicado.
     */
    List<Payment> findByStatus(PaymentStatus status);

    /**
     * Obtiene todos los pagos relacionados con un préstamo específico.
     *
     * @param loanId El identificador único del préstamo.
     * @return Una lista de pagos asociados al préstamo.
     */
    List<Payment> findByLoan_LoanId(UUID loanId);

    /**
     * Busca un pago específico utilizando el ID del préstamo y el número de cuota.
     *
     * @param loanId El identificador único del préstamo.
     * @param installmentNumber El número de cuota del pago.
     * @return Un Optional con el pago encontrado, o vacío si no existe.
     */
    Optional<Payment> findByLoan_LoanIdAndInstallmentNumber(UUID loanId, int installmentNumber);

    /**
     * Obtiene los pagos pendientes con fecha de vencimiento anterior a una fecha dada,
     * excluyendo aquellos que ya tienen una fecha de pago registrada o un estado específico.
     *
     * @param dueDate La fecha límite de vencimiento.
     * @param status El estado que se desea excluir (por ejemplo, PAID).
     * @return Una lista de pagos pendientes.
     */
    List<Payment> findByDueDateBeforeAndPaymentDateIsNullAndStatusNot(LocalDate dueDate, PaymentStatus status);
    /**
     * Busca el último pago realizado o en estado específico para un préstamo dado.
     * Acepta múltiples estados para buscar (por ejemplo, PAID, LATE).
     *
     * @param loanId El identificador único del préstamo.
     * @param paid Lista de estados permitidos para filtrar.
     * @return Un Optional con el pago encontrado, o vacío si no existe.
     */
    Optional<Payment> findTopByLoan_LoanIdAndStatusInOrderByInstallmentNumberDesc(UUID loanId, List<PaymentStatus> paid);

    /**
     * Busca todos los pagos pendientes asociados a un préstamo específico, ordenados por número de cuota en orden ascendente.
     *
     * @param loanId El identificador único del préstamo.
     * @return Una lista de pagos pendientes ordenados por número de cuota.
     */
    @Query("SELECT p FROM Payment p WHERE p.loan.loanId = :loanId AND p.status = 'PENDING' ORDER BY p.installmentNumber ASC")
    List<Payment> findPendingPaymentsByLoanId(@Param("loanId") UUID loanId);

    @Query("SELECT p FROM Payment p " +
            "WHERE p.loan.loanId = :loanId " +
            "AND p.status = com.financial.model.enums.PaymentStatus.PENDING " +
            "ORDER BY p.dueDate ASC")
    List<Payment> findPendingInstallments(@Param("loanId") UUID loanId, Pageable pageable);

    @Query("SELECT p FROM Payment p WHERE p.loan.loanId = :loanId AND p.status = com.financial.model.enums.PaymentStatus.PENDING")
    List<Payment> findPendingPayments(@Param("loanId") UUID loanId);

    Optional<Payment> findByPaymentId(UUID paymentId);
}
