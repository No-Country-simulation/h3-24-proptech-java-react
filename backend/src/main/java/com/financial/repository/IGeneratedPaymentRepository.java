package com.financial.repository;

import com.financial.model.GeneratedPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
            @Param("paymentType") String paymentType);
}
