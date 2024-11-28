package com.financial.dto.response.loan;

import com.financial.dto.response.auth.UserResponseDto;

import java.math.BigDecimal;

public record ResponseLoandAdminDTO(String loanId,
                                    BigDecimal requestedAmount,
                                    Integer termMonths,
                                    BigDecimal monthlyQuota,
                                    BigDecimal interestRate,
                                    String status,
                                    BigDecimal totalAmount,
                                    UserResponseDto user
) {
}
