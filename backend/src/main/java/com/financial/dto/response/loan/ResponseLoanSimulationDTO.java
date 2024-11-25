package com.financial.dto.response.loan;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.math.BigDecimal;
import java.util.List;

@JsonPropertyOrder({"monthlyQuota", "totalPayment", "requestedAmount", "termMonths", "schedule"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ResponseLoanSimulationDTO(BigDecimal monthlyQuota,           // Cuota mensual
                                        BigDecimal totalPayment,           // Pago total al final del préstamo
                                        BigDecimal requestedAmount,        // Monto solicitado
                                        Integer termMonths,                // Término en meses// Término en meses
                                        List<PaymentScheduleDTO> schedule  // Cronograma de pagos
) {}
