package com.financial.dto.response.loan;

import java.math.BigDecimal;

    public record ResponseLoanCalculationsDTO(BigDecimal monthlyQuota,           // Cuota mensual
                                          BigDecimal totalPayment,           // Pago total al final del préstamo
                                          BigDecimal requestedAmount,        // Monto solicitado
                                          Integer termMonths,                // Término en meses
                                          BigDecimal interestRate ){       // Término en meses) {

}
