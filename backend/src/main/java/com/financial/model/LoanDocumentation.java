package com.financial.model;

import com.financial.model.enums.DocType;
import com.financial.model.enums.UserType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "loan_documentations")
public class LoanDocumentation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID loanDocumentationId;

    @ManyToOne
    @JoinColumn(name = "loan_id",foreignKey = @ForeignKey(name = "FK_LOAN_DOCUMENTATION_LOAN"))
    private Loan loan;

    @Column(nullable = false, name = "doc_type")
    @Enumerated(EnumType.STRING)
    private DocType docType;

    @Column(nullable = false, name = "user_type")
    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Column(nullable = false, name = "url_file")
    private String urlFile;

    @Column(nullable = false, name = "upload_date")
    private LocalDate uploadDate;
}
