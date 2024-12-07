package com.financial.utils;

import com.financial.model.enums.LoanStatus;

import java.util.EnumMap;
import java.util.Map;

public class LoanStatusEmailUtil {

    private static final Map<LoanStatus, String> SUBJECTS = new EnumMap<>(LoanStatus.class);

    static {
        SUBJECTS.put(LoanStatus.INITIATED, "Tu solicitud de préstamo ha sido enviada");
        SUBJECTS.put(LoanStatus.PENDING, "Acción requerida: Tu solicitud de préstamo está en revisión");
        SUBJECTS.put(LoanStatus.APPROVED, "¡Felicitaciones! Tu préstamo ha sido aprobado");
        SUBJECTS.put(LoanStatus.PRE_APPROVED, "Tu préstamo ha sido preaprobado");
        SUBJECTS.put(LoanStatus.REFUSED, "Actualización importante: Tu solicitud de préstamo ha sido rechazada");
        SUBJECTS.put(LoanStatus.DEFAULTED, "Urgente: Tu préstamo está en mora");
    }

    /**
     * Devuelve el asunto del correo según el estado del préstamo.
     *
     * @param loanStatus El estado del préstamo.
     * @return El asunto del correo.
     * @throws IllegalArgumentException si el estado no tiene un asunto asociado.
     */
    public static String getSubjectForLoanStatus(LoanStatus loanStatus) {
        if (!SUBJECTS.containsKey(loanStatus)) {
            throw new IllegalArgumentException("No se encontró un asunto para el estado del préstamo: " + loanStatus);
        }
        return SUBJECTS.get(loanStatus);
    }
}
