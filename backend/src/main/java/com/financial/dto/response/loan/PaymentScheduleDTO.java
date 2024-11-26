package com.financial.dto.response.loan;

import java.math.BigDecimal;

public record PaymentScheduleDTO(Integer month,       // Número del mes
                                 BigDecimal quota,    // Cuota mensual
                                 BigDecimal interest, // Intereses del mes
                                 BigDecimal remaining // Saldo restante
) {}
