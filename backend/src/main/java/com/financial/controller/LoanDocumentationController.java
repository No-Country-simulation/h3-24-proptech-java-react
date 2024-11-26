package com.financial.controller;

import com.financial.dto.request.loan.UploadLoanDocumentationDTO;
import com.financial.dto.response.loan.LoanDocumentationResponseDTO;
import com.financial.dto.response.loan.LoanDocumentationStatusDTO;
import com.financial.model.LoanDocumentation;
import com.financial.service.impl.LoanDocumentsServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/loans/{loanId}/documents")
@RequiredArgsConstructor
public class LoanDocumentationController {
    private final LoanDocumentsServiceImpl loanDocumentsService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<LoanDocumentationResponseDTO> handleLoanDocumentUpload(
            @PathVariable UUID loanId,
            @ModelAttribute @Valid UploadLoanDocumentationDTO uploadLoanDocumentationDto
    ) {
        LoanDocumentation loanDocumentation = loanDocumentsService.attachOrUpdateDocumentToLoan(loanId, uploadLoanDocumentationDto);
        return ResponseEntity.ok(LoanDocumentationResponseDTO.toLoanDocumentationResponseDto(loanDocumentation));
    }

    @GetMapping("/status")
    public ResponseEntity<LoanDocumentationStatusDTO> getLoanDocumentationStatus(
            @PathVariable UUID loanId,
            @RequestParam(required = false) String guaranteeId
    ) {
        LoanDocumentationStatusDTO status = loanDocumentsService.getDocumentationStatus(loanId, guaranteeId);
        return ResponseEntity.ok(status);
    }

    @DeleteMapping("/{loanDocumentId}")
    public ResponseEntity<Void> deleteLoanDocumentation(@PathVariable UUID loanId, @PathVariable UUID loanDocumentId) {
        loanDocumentsService.deleteLoanDocumentation(loanId, loanDocumentId);
        return ResponseEntity.ok().build();
    }

}
