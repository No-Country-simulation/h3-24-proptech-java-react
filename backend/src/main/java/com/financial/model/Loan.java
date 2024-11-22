package com.financial.model;

import com.financial.model.enums.DocType;
import com.financial.model.enums.LoanStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Nullable;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "loans")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Loan extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID loanId;

    @Column(nullable = false, name = "requested_amount")
    private BigDecimal requestedAmount;

    @Column(nullable = false, name = "total_amount")
    private BigDecimal totalAmount;

    @Column(nullable = true, name = "monthly_Quota")
    private BigDecimal monthlyQuota;

    @Column(nullable = false, name = "term_months")
    private Integer termMonths;

    @Column(nullable = false, name = "interest_rate")
    private BigDecimal interestRate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    @Column(nullable = true, name = "date_accepted")
    private LocalDate dateAccepted;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_LOAN_USER"))
    private User user;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LoanDocumentation> documents = new ArrayList<>();

    public List<LoanDocumentation> getDocumentsOfType(DocType docType, @Nullable String guaranteeId) {
        List<LoanDocumentation> documentsOfType = documents.stream().filter(doc -> doc.getDocType().equals(docType)).toList();
        if (guaranteeId != null) {
            return documentsOfType.stream().filter(document -> document.getGuaranteeId().equals(guaranteeId)).toList();
        }
        return documentsOfType;
    }

    public boolean hasDocument(LoanDocumentation document) {
        LoanDocumentation loanDocumentation = getLoanDocumentation(document);
        return loanDocumentation != null;
    }

    public LoanDocumentation getLoanDocumentation(LoanDocumentation doc) {
        for (LoanDocumentation document : documents) {
            boolean isSameDocType = document.getDocType().equals(doc.getDocType());
            boolean isSameUserType = document.getUserType().equals(doc.getUserType());
            if (isSameDocType && isSameUserType) {
                if (doc.getGuaranteeId() == null) {
                    return document;
                } else if (doc.getGuaranteeId().equals(document.getGuaranteeId())) {
                    return document;
                }
            }
        }
        return null;
    }

    public int getDocumentCountOfType(DocType docType) {
        int count = 0;
        for (LoanDocumentation document : documents) {
            if (document.getDocType().equals(docType)) {
                count++;
            }
        }
        return count;
    }

}
