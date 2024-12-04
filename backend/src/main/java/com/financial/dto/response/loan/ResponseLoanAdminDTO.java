package com.financial.dto.response.loan;

import com.financial.dto.response.auth.UserResponseDto;
import com.financial.dto.response.payment.ResponsePaymentDTO;
import com.financial.dto.response.profile.ResponseProfileDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record ResponseLoanAdminDTO( UUID loanId,
                                   BigDecimal requestedAmount,
                                   Integer termMonths,
                                   BigDecimal monthlyQuota,
                                   BigDecimal interestRate,
                                   String status,
                                   BigDecimal totalAmount,
                                   UserResponseDto user,
                                   ResponseProfileDTO profile,
                                   List<LoanDocumentationResponseDTO> documents,
                                   List<ResponsePaymentDTO> payments
) {
}
