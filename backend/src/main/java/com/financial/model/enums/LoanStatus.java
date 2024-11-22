package com.financial.model.enums;

/**
 * Representa los posibles estados en el ciclo de vida de un préstamo.
 *
 * <p>Estos estados permiten identificar en qué etapa se encuentra el préstamo y tomar acciones
 * correspondientes en función de la lógica de negocio. Los estados incluyen:</p>
 *
 * <ul>
 *   <li><b>INITIATED:</b> El préstamo ha sido solicitado pero aún no procesado.</li>
 *   <li><b>PENDING:</b> El préstamo está a la espera de acciones adicionales, como revisión de documentos.</li>
 *   <li><b>APPROVED:</b> El préstamo ha sido aprobado y los fondos están disponibles para el usuario.</li>
 *   <li><b>PRE_APPROVED:</b> El préstamo está preaprobado, sujeto a pasos adicionales antes de activarse.</li>
 *   <li><b>REFUSED:</b> La solicitud del préstamo ha sido rechazada.</li>
 *   <li><b>DEFAULTED:</b> El préstamo está en mora debido a la falta de pagos del usuario.</li>
 * </ul>
 */
public enum LoanStatus {
    INITIATED,
    PENDING,
    APPROVED,
    PRE_APPROVED,
    REFUSED,
    DEFAULTED
}
