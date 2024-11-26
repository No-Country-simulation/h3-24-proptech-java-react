package com.financial.service.impl;

import com.financial.dto.response.LoanRateResponseDTO;
import com.financial.model.enums.LoanRate;
import com.financial.service.ILoanRateService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class LoanRateServiceImpl implements ILoanRateService {
    @Override
    public List<Integer> getAllLoanMonths() {
        return Stream.of(LoanRate.values())
                .map(LoanRate::getMonths)
                .collect(Collectors.toList());
    }

    @Override
    public List<LoanRateResponseDTO> getDetailedLoanRates() {
        return Stream.of(LoanRate.values())
                .map(rate -> new LoanRateResponseDTO(rate.name(), rate.getMonths(), rate.getRate()))
                .collect(Collectors.toList());
    }
}
