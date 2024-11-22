package com.financial.dto.response.loan;

import com.financial.model.CloudFile;
import com.financial.model.LoanDocumentation;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoanDocumentationResponseDTO {
    private String docType;
    private String userType;
    private String binding;
    private String guaranteeId;
    private CloudFile cloudFile;

    public static LoanDocumentationResponseDTO toLoanDocumentationResponseDto(LoanDocumentation loanDocumentation) {
        return LoanDocumentationResponseDTO.builder()
                .docType(loanDocumentation.getDocType().name())
                .userType(loanDocumentation.getUserType().name())
                .binding(loanDocumentation.getBinding())
                .guaranteeId(loanDocumentation.getGuaranteeId())
                .cloudFile(loanDocumentation.getCloudFile())
                .build();
    }
}
