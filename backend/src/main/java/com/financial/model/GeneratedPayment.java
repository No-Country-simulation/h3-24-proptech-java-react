package com.financial.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "GeneratedPayments", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"loan_id", "installment_number"})
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GeneratedPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idDetail;

    @Column(name = "loan_id", nullable = false)
    private UUID loanId;

    @Column(name = "payment_id", nullable = false)
    private UUID paymentId;

    @Column(name = "installment_number", nullable = false)
    private Integer installmentNumber;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "paid_on_time", nullable = false)
    private  boolean paidOnTime = false;

    @Column(name = "pay_limit_date", nullable = false)
    private LocalDate payLimitDate;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "late_fee", nullable = false)
    @Builder.Default
    private BigDecimal lateFee = BigDecimal.ZERO;

    @Column(name = "generated_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime generatedAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
    @Column(name = "total_amount_with_interests", nullable = false)
    @Builder.Default
    public BigDecimal totalAmountWithInterests = BigDecimal.ZERO;
    @Column(name = "total_amount_without_interests", nullable = false)
    @Builder.Default
    public BigDecimal totalAmountWithoutInterests = BigDecimal.ZERO;

    @Column(name = "payment_type", nullable = false)
    private String paymentType;

    @Column(name = "discount_percentage")
    @Builder.Default
    private BigDecimal discountPercentage = BigDecimal.ZERO;

    @Column(name = "requested_amount")
    @Builder.Default
    private BigDecimal requestedAmount = BigDecimal.ZERO;

    @Column(name = "total_amount")
    @Builder.Default
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "remaining_balance")
    @Builder.Default
    private BigDecimal remainingBalance = BigDecimal.ZERO;

}
