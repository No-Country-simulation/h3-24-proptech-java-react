package com.financial.dto.response.loan;

import java.math.BigDecimal;

public record ResponseLoanCalculationsDTO(
        // Cuota mensual
        BigDecimal monthlyQuota,

        // Pago total al final del préstamo
        BigDecimal totalPayment,

        // Monto solicitado
        BigDecimal requestedAmount,

        // Término en meses
        Integer termMonths,

        // Interest en meses
        BigDecimal interestRate
) {

}
