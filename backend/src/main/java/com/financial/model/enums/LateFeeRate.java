package com.financial.model.enums;

import lombok.Getter;
import java.math.BigDecimal;

@Getter
public enum LateFeeRate {
    // Tasa de interés por atraso después del día 10
    DAY_1(new BigDecimal("0.002")), // 0.02% diario por atraso

    // Descuento por pago anticipado, por ejemplo, 5% si el pago es dentro de los primeros 5 días
    EARLY_PAYMENT_DISCOUNT(new BigDecimal("0.05")); // 5% de descuento

    private final BigDecimal rate;

    LateFeeRate(BigDecimal rate) {
        this.rate = rate;
    }

    /**
     * Determina la tasa de interés aplicable según los días de atraso o el descuento por pago anticipado.
     * @param lateDays días de atraso
     * @param isPaidEarly indica si el pago es anticipado
     * @return tasa de interés o descuento aplicable
     */
    public static BigDecimal getLateFeeRate(int lateDays, boolean isPaidEarly) {
        if (isPaidEarly) {
            // Si el pago es anticipado, se aplica un descuento
            return EARLY_PAYMENT_DISCOUNT.getRate();
        } else if (lateDays <= 10) {
            // Si el pago es dentro de los primeros 10 días, no hay intereses
            return BigDecimal.ZERO;
        } else {
            // Si el pago es después de los 10 días, se aplica la tasa de interés diaria
            return DAY_1.getRate();
        }
    }
}
