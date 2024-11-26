package com.financial.dto.response;

import java.math.BigDecimal;

public record LoanRateResponseDTO(String name, Integer months, BigDecimal rate
) {
}
