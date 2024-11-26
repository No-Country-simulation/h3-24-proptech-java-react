package com.financial.service;

import com.financial.dto.response.LoanRateResponseDTO;

import java.util.List;

public interface ILoanRateService {
    List<Integer> getAllLoanMonths();
    List<LoanRateResponseDTO> getDetailedLoanRates();
}
