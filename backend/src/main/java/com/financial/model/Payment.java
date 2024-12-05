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
    @JoinColumn(name = "loan_id", foreignKey = @ForeignKey(name = "FK_PAYMENT_LOAN"))
    private Loan loan;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cloud_file_id")
    private CloudFile cloudFile;

    @Column(nullable = false)
    private BigDecimal amount;

    // Fecha de vencimiento de la cuota
    private LocalDate dueDate;

    // Fecha límite para el pago (por ejemplo, entre el 1 y el 10 de cada mes)
    private LocalDate payLimitDate;

    // Fecha en la que se realizó el pago
    @Column(nullable = true)
    private LocalDate paymentDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    // Monto del interés por atraso
    private BigDecimal lateFee;

    // Si se aplicó o no un interés por atraso
    private boolean lateFeeApplied;

    // Tasa de interés por atraso (por ejemplo, 0.03 para 3%)
    private BigDecimal interestRate;

    // Si el pago fue realizado dentro del rango (1-10 del mes)
    private boolean paidOnTime;

    // Número de la cuota (1, 2, ..., término del préstamo)
    private int installmentNumber;

    @Setter
    @Getter
    private boolean isGenerated;
}
