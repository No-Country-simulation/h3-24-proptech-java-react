package com.financial.dto.response.loan;

import com.financial.dto.response.auth.UserResponseDto;
import com.financial.dto.response.profile.ResponseProfileDTO;

import java.math.BigDecimal;
import java.util.List;

public record ResponseLoandAdminDTO(String loanId,
                                    BigDecimal requestedAmount,
                                    Integer termMonths,
                                    BigDecimal monthlyQuota,
                                    BigDecimal interestRate,
                                    String status,
                                    BigDecimal totalAmount,
                                    UserResponseDto user,
                                    ResponseProfileDTO profile,
                                    List<LoanDocumentationResponseDTO> documents
) {
}
