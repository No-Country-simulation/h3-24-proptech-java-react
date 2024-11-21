package com.financial.model;


import com.financial.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID paymentId;
    @ManyToOne
    @JoinColumn(name = "loan_id",foreignKey = @ForeignKey(name = "FK_PAYMENT_LOAN"))
    private Loan loan;
    @Column(nullable = false)
    private BigDecimal amount;
    @Column(nullable = false)
    private LocalDate paymentDate;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;


}
