package com.financial.controller;

import com.financial.dto.response.LoanRateResponseDTO;
import com.financial.service.impl.LoanRateServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LoanRateController {

    private final LoanRateServiceImpl loanRateService;

    public LoanRateController(LoanRateServiceImpl loanRateService) {
        this.loanRateService = loanRateService;
    }

    @GetMapping("/loan-rates/months")
    public ResponseEntity<List<Integer>> getLoanMonths() {
        return ResponseEntity.ok(loanRateService.getAllLoanMonths());
    }

    @GetMapping("/loan-rates/detailed")
    public ResponseEntity<List<LoanRateResponseDTO>> getDetailedLoanRates() {
        return ResponseEntity.ok( loanRateService.getDetailedLoanRates());
    }
}
