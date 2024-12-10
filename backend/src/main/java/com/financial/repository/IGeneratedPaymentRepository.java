package com.financial.repository;

import com.financial.model.GeneratedPayment;
import com.financial.model.enums.PaymentStatus;
import com.financial.model.enums.PaymentType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IGeneratedPaymentRepository extends JpaRepository<GeneratedPayment, UUID> {

    @Query("SELECT p FROM GeneratedPayment p " +
            "WHERE p.loanId = :loanId " +
            "AND p.status = 'PENDING' " +
            "AND p.paymentType = :paymentType " +
            "ORDER BY p.installmentNumber ASC")
    GeneratedPayment findTopByLoanIdAndPaymentTypeAndStatusOrderByInstallmentNumberAsc(
            @Param("loanId") UUID loanId,
            @Param("paymentType") String paymentType
    );

    @Query("SELECT p FROM GeneratedPayment p " +
            "WHERE p.loanId = :loanId " +
            "AND p.status = 'PENDING' " +
            "AND p.paymentType = :paymentType " +
            "ORDER BY p.installmentNumber ASC")
    Page<GeneratedPayment> findTopByLoanIdAndPaymentTypeAndStatusOrderByInstallmentNumberAsc(
            @Param("loanId") UUID loanId,
            @Param("paymentType") String paymentType,
            Pageable pageable
    );

    @Query("SELECT p FROM GeneratedPayment p WHERE p.loanId = :loanId AND p.installmentNumber = :installmentNumber")
    Optional<GeneratedPayment> findByLoanIdAndInstallmentNumber(
            @Param("loanId") UUID loanId,
            @Param("installmentNumber") Integer installmentNumber
    );

    Optional<GeneratedPayment> findByPaymentId(UUID paymentId);

    List<GeneratedPayment> findAllByStatusAndPaymentType(String status, String paymentType);
}
