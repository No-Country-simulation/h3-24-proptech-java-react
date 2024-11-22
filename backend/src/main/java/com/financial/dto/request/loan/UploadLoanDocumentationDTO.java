package com.financial.dto.request.loan;


import com.financial.dto.customValidation.ValueOfEnum;
import com.financial.model.LoanDocumentation;
import com.financial.model.enums.DocType;
import com.financial.model.enums.UserType;
import org.springframework.web.multipart.MultipartFile;

import java.util.Locale;

public record UploadLoanDocumentationDTO(
        @ValueOfEnum(enumClass = DocType.class)
        String docType,

        @ValueOfEnum(enumClass = UserType.class)
        String userType,

        String binding,

        String guaranteeId,

        MultipartFile document
) {

    public DocType getDocTypeAsEnum() {
        return DocType.valueOf(docType.toUpperCase(Locale.ENGLISH));
    }

    public UserType getUserTypeAsEnum() {
        return UserType.valueOf(userType.toUpperCase(Locale.ENGLISH));
    }

    public LoanDocumentation toLoanDocumentation() {
        LoanDocumentation loanDocumentation = new LoanDocumentation();
        loanDocumentation.setDocType(getDocTypeAsEnum());
        loanDocumentation.setUserType(getUserTypeAsEnum());
        loanDocumentation.setBinding(binding);
        loanDocumentation.setGuaranteeId(guaranteeId);
        return loanDocumentation;
    }

}
