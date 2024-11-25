package com.financial.repository;

import com.financial.model.Payment;
import com.financial.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IPaymentRepository extends JpaRepository<Payment, UUID> {
    // Método para obtener todos los pagos pendientes
    List<Payment> findByStatus(PaymentStatus status);

    // Método para obtener pagos de un préstamo específico
    List<Payment> findByLoan_LoanId(UUID loanId);

    // Método para buscar el paymentId por loanId y installmentNumber
    Optional<Payment> findByLoan_LoanIdAndInstallmentNumber(UUID loanId, int installmentNumber);
    // Método para buscar pagos pendientes por fecha de vencimiento
    List<Payment> findByDueDateBeforeAndPaymentDateIsNullAndStatusNot(LocalDate dueDate, PaymentStatus status);
}
