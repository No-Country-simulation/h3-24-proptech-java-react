package com.financial.repository;

import com.financial.model.Loan;
import com.financial.model.enums.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ILoanRepository extends JpaRepository<Loan, UUID> {
    @Query("SELECT l FROM Loan l WHERE l.deleted = false")
    List<Loan> findAllActiveLoans();

    @Query("SELECT l FROM Loan l WHERE l.deleted = false and l.status = :status")
    List<Loan> findAllByStatus(@Param("status") LoanStatus status);

    @Query(value = "SELECT * FROM loans l WHERE l.user_id = :userId and l.deleted = false", nativeQuery = true)
    List<Loan> findByUserId(@Param("userId") UUID userId);
    @Query(value = "SELECT * FROM loans l WHERE l.user_id = :userId and l.deleted = false and l.status NOT IN ('REFUSED', 'DEFAULTED')", nativeQuery = true)
    Optional<Loan> findLoanByUserId(@Param("userId") UUID userId);
}
