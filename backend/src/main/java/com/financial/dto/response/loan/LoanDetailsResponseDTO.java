package com.financial.dto.response.loan;

import com.financial.dto.response.auth.UserResponseDto;
import com.financial.dto.response.profile.ResponseProfileDTO;

import java.util.List;

public record LoanDetailsResponseDTO(
        ResponseLoanDTO loan,
        UserResponseDto user,
        ResponseProfileDTO profile,
        List<LoanDocumentationStatusDTO> documentationStatuses
) {

}
