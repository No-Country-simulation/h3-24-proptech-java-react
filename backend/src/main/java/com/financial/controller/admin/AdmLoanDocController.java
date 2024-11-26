package com.financial.controller.admin;

import com.financial.dto.response.loan.LoanDocumentationResponseDTO;
import com.financial.service.ILoanDocumentsService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/loan-doc")
@RequiredArgsConstructor
public class AdmLoanDocController {
    private final ILoanDocumentsService loanDocumentsService;

    @GetMapping("/get-docs/{loanId}")
    public ResponseEntity<List<LoanDocumentationResponseDTO>> getDocs(
            @PathVariable("loanId")
            @NotBlank(message = "The loan id cannot be blank")
            UUID loanId
    ) {
        return ResponseEntity.ok(loanDocumentsService.getDocsByLoanId(loanId));
    }
}
