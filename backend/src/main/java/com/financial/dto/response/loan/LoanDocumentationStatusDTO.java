package com.financial.dto.response.loan;

import com.financial.model.CloudFile;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class LoanDocumentationStatusDTO {
    private boolean allDocumentsUploaded;
    private List<DocumentTypeStatus> documentTypeStatuses = new ArrayList<>();

    public void addDocumentStatusPerType(DocumentTypeStatus documentTypeStatus) {
        if (documentTypeStatuses == null) {
            documentTypeStatuses = new ArrayList<>();
        }
        documentTypeStatuses.add(documentTypeStatus);
    }

    @Builder
    public record DocumentTypeStatus(
            String documentType,
            List<DocumentStatus> documents,
            int minRequired,
            int maxCount,
            int currentCount
    ) {
    }

    @Builder
    public record DocumentStatus(String id, CloudFile file) {

    }

}
