package com.financial.controller.loan;

import com.financial.config.CurrentUser;
import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.request.loan.RequestRefinanceLoanDTO;
import com.financial.dto.response.loan.LoanDetailsResponseDTO;
import com.financial.dto.response.loan.LoanMovedToPendingResultDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.model.User;
import com.financial.service.ILoanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
public class LoanController {
    private final ILoanService loanService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<ResponseLoanDTO>> getLoansOfUser(@PathVariable UUID userId) {
        List<ResponseLoanDTO> loans = loanService.getLoansOfUser(userId);
        return ResponseEntity.ok(loans);
    }

    @GetMapping("/{loanId}/details")
    public ResponseEntity<LoanDetailsResponseDTO> loanDetails(@PathVariable UUID loanId) {
        LoanDetailsResponseDTO response = loanService.getLoanDetails(loanId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseLoanDTO> createLoan(
            @CurrentUser User user,
            @RequestBody RequestLoanSimulationDTO request
    ) {
        return ResponseEntity.ok(loanService.createLoan(user.getUserId(), request));
    }


    @GetMapping("/get-loan")
    public ResponseEntity<LoanDetailsResponseDTO> getLoan(@CurrentUser User user) {
        LoanDetailsResponseDTO response = loanService.getLoan(user.getUserId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{loanId}/refinance")
    public ResponseEntity<ResponseLoanDTO> refinanceLoan(
            @PathVariable UUID loanId,
            @Valid @RequestBody RequestRefinanceLoanDTO request
    ) {
        return ResponseEntity.ok(loanService.refinanceLoan(loanId, request));
    }

    @PostMapping("/{loanId}/pending")
    public ResponseEntity<LoanMovedToPendingResultDTO> setToPendingStatus(@PathVariable UUID loanId) {
        LoanMovedToPendingResultDTO result = loanService.setLoanToPendingStatus(loanId);
        if (result.movedSuccessfullyToPendingStatus()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
    }

}