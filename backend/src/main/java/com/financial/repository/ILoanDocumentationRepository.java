package com.financial.repository;

import com.financial.model.LoanDocumentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ILoanDocumentationRepository extends JpaRepository<LoanDocumentation, UUID> {

    Optional<LoanDocumentation> getLoanDocumentationByLoan_LoanIdAndLoanDocumentationId(UUID loanId, UUID loanDocumentationId);
    @Query(value = "SELECT l FROM LoanDocumentation l where l.loan.loanId = :loanId")
    List<LoanDocumentation> getLoanDocumentationByLoanId(@Param("loanId") UUID loanId);

}
