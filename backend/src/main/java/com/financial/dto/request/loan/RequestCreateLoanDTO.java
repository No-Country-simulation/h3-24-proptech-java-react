package com.financial.dto.request.loan;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Representa la solicitud para crear un nuevo préstamo.
 * Este record incluye validaciones mediante anotaciones de Jakarta Bean Validation
 * para garantizar que los datos proporcionados cumplan con los requisitos mínimos.
 *
 * Campos incluidos:
 * <ul>
 *   <li><b>userId:</b> Identificador único del usuario que solicita el préstamo.</li>
 *   <li><b>requestedAmount:</b> Monto solicitado por el usuario. Debe ser un valor positivo.</li>
 *   <li><b>termMonths:</b> Plazo del préstamo en meses. Debe ser un número entero positivo.</li>
 *   <li><b>monthlyQuota:</b> Cuota mensual estimada del préstamo. Debe ser positiva.</li>
 *   <li><b>interestRate:</b> Tasa de interés aplicada al préstamo. Debe ser positiva.</li>
 *   <li><b>totalAmount:</b> Monto total a pagar por el préstamo, incluyendo intereses. Debe ser positivo.</li>
 * </ul>
 *
 * Ejemplo de JSON esperado:
 * <pre>
 * {
 *   "userId": "a33637e6-4456-4a1d-9cb1-48d91ccf77e4",
 *   "requestedAmount": 11500.00,
 *   "termMonths": 6,
 *   "monthlyQuota": 2121.70,
 *   "interestRate": 18.45,
 *   "totalAmount": 12730.20
 * }
 * </pre>
 *
 * Validaciones aplicadas:
 * <ul>
 *   <li><b>@NotNull:</b> Los campos no pueden ser nulos.</li>
 *   <li><b>@Positive:</b> Los valores numéricos deben ser mayores a cero.</li>
 * </ul>
 *
 * @param userId Identificador único del usuario que solicita el préstamo.
 * @param requestedAmount Monto solicitado por el usuario. Debe ser positivo.
 * @param termMonths Duración del préstamo en meses. Debe ser positivo.
 * @param monthlyQuota Cuota mensual calculada del préstamo. Debe ser positiva.
 * @param interestRate Tasa de interés aplicada al préstamo. Debe ser positiva.
 * @param totalAmount Monto total a pagar, incluyendo el capital e intereses. Debe ser positivo.
 */
public record RequestCreateLoanDTO(@NotNull UUID userId,
                                   @NotNull @Positive BigDecimal requestedAmount,
                                   @NotNull @Positive Integer termMonths) {
}
