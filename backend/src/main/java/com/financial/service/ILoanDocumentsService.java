package com.financial.service;

import com.financial.dto.request.loan.UploadLoanDocumentationDTO;
import com.financial.dto.response.loan.LoanDocumentationResponseDTO;
import com.financial.dto.response.loan.LoanDocumentationStatusDTO;
import com.financial.model.LoanDocumentation;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.UUID;

public interface ILoanDocumentsService {
    LoanDocumentation attachOrUpdateDocumentToLoan(UUID loanId, UploadLoanDocumentationDTO uploadLoanDocumentationDto);

    List<LoanDocumentationStatusDTO> getDocumentationStatusForLoan(UUID loanId);

    LoanDocumentationStatusDTO getDocumentationStatusForHolderOrGuarantee(UUID loanId, @Nullable String guaranteeId);

    void deleteLoanDocumentation(UUID loanId, UUID loanDocumentationId);
    List<LoanDocumentationResponseDTO> getDocsByLoanId(UUID loanId);
}
