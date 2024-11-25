package com.financial.controller;

import com.financial.config.CurrentUser;
import com.financial.dto.request.loan.RequestCreateLoanDTO;
import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.request.loan.RequestRefinanceLoanDTO;
import com.financial.dto.response.loan.ResponseLoanDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;
import com.financial.model.User;
import com.financial.service.ILoanService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final ILoanService loanService;

    public LoanController(ILoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping("/simulate")
    public ResponseEntity<ResponseLoanSimulationDTO> simulateLoan(@Valid @RequestBody RequestLoanSimulationDTO request) {
        return ResponseEntity.ok(loanService.simulateLoan(request));
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseLoanDTO> createLoan(@CurrentUser User user, @RequestBody RequestLoanSimulationDTO request) {
        return ResponseEntity.ok(loanService.createLoan(user.getUserId(), request));
    }

    @PostMapping("/{loanId}/refinance")
    public ResponseEntity<ResponseLoanDTO> refinanceLoan(@PathVariable UUID loanId, @Valid @RequestBody RequestRefinanceLoanDTO request) {
        return ResponseEntity.ok(loanService.refinanceLoan(loanId, request));
    }

}