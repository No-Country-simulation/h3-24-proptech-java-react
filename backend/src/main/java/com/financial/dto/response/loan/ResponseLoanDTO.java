package com.financial.dto.response.loan;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.math.BigDecimal;
/**
 * Representa la respuesta de un préstamo creado o consultado.
 * Este record utiliza anotaciones de Jackson para definir el orden de los campos en la serialización JSON
 * y excluir valores nulos de la salida JSON.
 *
 * Campos incluidos:
 * <ul>
 *   <li><b>loanId:</b> Identificador único del préstamo.</li>
 *   <li><b>requestedAmount:</b> Monto solicitado por el usuario.</li>
 *   <li><b>termMonths:</b> Plazo del préstamo en meses.</li>
 *   <li><b>monthlyQuota:</b> Cuota mensual calculada.</li>
 *   <li><b>interestRate:</b> Tasa de interés aplicada al préstamo.</li>
 *   <li><b>status:</b> Estado actual del préstamo (ejemplo: "INITIATED").</li>
 * </ul>
 *
 * Ejemplo de JSON serializado:
 * <pre>
 * {
 *   "loanId": "33932791-b82f-42f3-af69-22d6c8fca305",
 *   "requestedAmount": 11500.00,
 *   "termMonths": 6,
 *   "monthlyQuota": 2121.70,
 *   "interestRate": 18.45,
 *   "status": "INITIATED"
 * }
 * </pre>
 *
 * @param loanId Identificador único del préstamo.
 * @param requestedAmount Monto solicitado por el usuario.
 * @param termMonths Duración del préstamo en meses.
 * @param monthlyQuota Cuota mensual calculada a pagar por el usuario.
 * @param interestRate Tasa de interés aplicada al préstamo.
 * @param status Estado actual del préstamo.
 */
@JsonPropertyOrder({"loanId", "requestedAmount", "termMonths", "monthlyQuota", "interestRate", "status"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ResponseLoanDTO(String loanId,
                              BigDecimal requestedAmount,
                              Integer termMonths,
                              BigDecimal monthlyQuota,
                              BigDecimal interestRate,
                              String status,
                              BigDecimal totalPayment
                              ) {
}
