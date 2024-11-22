package com.financial.service;

import com.financial.dto.request.loan.UploadLoanDocumentationDTO;
import com.financial.dto.response.loan.LoanDocumentationStatusDTO;
import com.financial.model.LoanDocumentation;
import org.springframework.lang.Nullable;

import java.util.UUID;

public interface LoanDocumentsService {

    LoanDocumentation attachOrUpdateDocumentToLoan(UUID loanId, UploadLoanDocumentationDTO uploadLoanDocumentationDto);

    LoanDocumentationStatusDTO getDocumentationStatus(UUID loanId, @Nullable String guaranteeId);

    void deleteLoanDocumentation(UUID loanId, UUID loanDocumentationId);
    
}
