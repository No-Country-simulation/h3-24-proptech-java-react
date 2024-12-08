package com.financial.controller.loan;

import com.financial.dto.request.loan.RequestLoanSimulationDTO;
import com.financial.dto.response.loan.ResponseLoanSimulationDTO;
import com.financial.service.ILoanCalculatorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/loans/simulate")
@RequiredArgsConstructor
public class LoanCalculatorController {
    private final ILoanCalculatorService loanCalculatorService;

    @PostMapping
    public ResponseEntity<ResponseLoanSimulationDTO> simulateLoan(@Valid @RequestBody RequestLoanSimulationDTO request) {
        return ResponseEntity.ok(loanCalculatorService.simulateLoan(request));
    }

}
