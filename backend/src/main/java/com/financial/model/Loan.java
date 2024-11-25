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
        return documents.stream()
                .filter(doc -> doc.getDocType().equals(docType))
                .filter(doc -> {
                    // This document is attached to a holder if its guarantee id is null
                    if (doc.getGuaranteeId() == null) {
                        return guaranteeId == null;
                    } else {
                        return doc.getGuaranteeId().equals(guaranteeId);
                    }
                })
                .toList();
    }

    public boolean hasDocument(LoanDocumentation document) {
        return hasDocument(document.getDocType(), document.getGuaranteeId());
    }

    public boolean hasDocument(DocType docType, @Nullable String guaranteeId) {
        LoanDocumentation loanDocumentation = getLoanDocumentation(docType, guaranteeId);
        return loanDocumentation != null;
    }

    public LoanDocumentation getLoanDocumentation(LoanDocumentation loanDocumentation) {
        return getLoanDocumentation(loanDocumentation.getDocType(), loanDocumentation.getGuaranteeId());
    }

    public LoanDocumentation getLoanDocumentation(DocType docType, @Nullable String guaranteeId) {
        return getDocumentsOfType(docType, guaranteeId).stream()
                .findFirst()
                .orElse(null);
    }

}
