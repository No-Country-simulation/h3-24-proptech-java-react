package com.financial.model;

import com.financial.model.enums.LoanStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;


@Entity
@Table(name = "loans")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Loan extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID loanId;
    @Column(nullable = false, name = "requested_amount")
    private BigDecimal requestedAmount;
    @Column(nullable = false, name = "total_amount")
    private BigDecimal totalAmount;
    @Column(nullable = false, name = "term_months")
    private Integer termMonths;
    @Column(nullable = false, name = "interest_rate")
    private Double interestRate;
    @Column(nullable = false)

    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    @Column(nullable = true, name = "date_accepted")
    private LocalDate dateAccepted;
    @ManyToOne
    @JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "FK_LOAN_USER"))
    private User user;
}
