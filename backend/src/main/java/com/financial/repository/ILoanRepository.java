package com.financial.repository;

import com.financial.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ILoanRepository extends JpaRepository<Loan, UUID> {
    @Query("SELECT l FROM Loan l WHERE l.deleted = false")
    List<Loan> findAllActiveLoans();
}
