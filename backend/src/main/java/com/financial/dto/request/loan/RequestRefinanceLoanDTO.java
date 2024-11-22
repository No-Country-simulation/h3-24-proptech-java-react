package com.financial.dto.request.loan;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

/**
 * DTO para solicitar la refinanciación de un préstamo existente. Contiene los nuevos valores propuestos.
 *
 * <p>Campos:</p>
 * <ul>
 *   <li><b>newAmount:</b> (obligatorio) Nuevo monto solicitado para refinanciar el préstamo. Debe ser positivo.</li>
 *   <li><b>newTermMonths:</b> (obligatorio) Nuevo plazo en meses para el préstamo refinanciado. Debe ser positivo.</li>
 *   <li><b>newInterestRate:</b> (opcional) Nueva tasa de interés para el préstamo refinanciado. Si no se especifica, se mantiene la actual.</li>
 * </ul>
 *
 * <p>Validaciones:</p>
 * <ul>
 *   <li><b>newAmount:</b> Debe ser un valor positivo ({@code @Positive}).</li>
 *   <li><b>newTermMonths:</b> Debe ser un valor positivo ({@code @Positive}).</li>
 *   <li><b>newInterestRate:</b> Debe ser un valor positivo ({@code @Positive}).</li>
 * </ul>
 */
public record RequestRefinanceLoanDTO(@NotNull @Positive BigDecimal newAmount,
                                      @NotNull @Positive Integer newTermMonths,
                                      @NotNull @Positive  BigDecimal newInterestRate) {
}
