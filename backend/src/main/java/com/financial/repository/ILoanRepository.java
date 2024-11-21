package com.financial.repository;

import com.financial.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ILoanRepository extends JpaRepository<Loan, UUID> {
}
