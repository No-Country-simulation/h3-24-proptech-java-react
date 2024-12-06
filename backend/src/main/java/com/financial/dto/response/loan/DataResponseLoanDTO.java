package com.financial.dto.response.loan;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@JsonPropertyOrder({"loanId", "requestedAmount", "totalAmount", "monthlyQuota", "remainingBalance", "termMonths", "interestRate", "status", "dateAccepted"})
public record DataResponseLoanDTO(
        UUID loanId,
        BigDecimal requestedAmount,
        BigDecimal totalAmount,
        BigDecimal monthlyQuota,
        BigDecimal remainingBalance,
        Integer termMonths,
        BigDecimal interestRate,
        String status,
        LocalDate dateAccepted
        ) {
}
