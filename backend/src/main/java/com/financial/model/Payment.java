package com.financial.model;

import com.financial.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@ToString
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
    private LocalDate dueDate;          // Fecha de vencimiento de la cuota
    private LocalDate payLimitDate;     // Fecha límite para el pago (por ejemplo, entre el 1 y el 10 de cada mes)
    @Column(nullable = true)
    private LocalDate paymentDate;      // Fecha en la que se realizó el pago
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    private BigDecimal lateFee;         // Monto del interés por atraso
    private boolean lateFeeApplied;     // Si se aplicó o no un interés por atraso
    private BigDecimal interestRate;    // Tasa de interés por atraso (por ejemplo, 0.03 para 3%)
    private boolean paidOnTime;         // Si el pago fue realizado dentro del rango (1-10 del mes)
    private int installmentNumber;      // Número de la cuota (1, 2, ..., término del préstamo)
    @Setter
    @Getter
    private boolean isGenerated;
}
