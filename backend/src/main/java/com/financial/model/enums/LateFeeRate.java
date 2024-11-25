package com.financial.model.enums;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public enum LateFeeRate {
    // Rangos de días con intereses ajustados
    DAY_1_TO_3(new BigDecimal("0.003")),    // 0.3% de interés por mora entre 1 y 3 días
    DAY_4_TO_7(new BigDecimal("0.007")),    // 0.7% de interés por mora entre 4 y 7 días
    DAY_8_TO_15(new BigDecimal("0.015")),   // 1.5% de interés por mora entre 8 y 15 días
    DAY_16_TO_30(new BigDecimal("0.025")),  // 2.5% de interés por mora entre 16 y 30 días
    DAY_31_TO_60(new BigDecimal("0.04")),   // 4% de interés por mora entre 31 y 60 días
    DAY_61_TO_90(new BigDecimal("0.06")),   // 6% de interés por mora entre 61 y 90 días
    OVER_90_DAYS(new BigDecimal("0.10"));   // 10% de interés por mora de más de 90 días

    private final BigDecimal rate;

    LateFeeRate(BigDecimal rate) {
        this.rate = rate;
    }

    /**
     * Determina la tasa de interés aplicable según los días de atraso.
     * @param lateDays días de atraso
     * @return tasa de interés aplicable
     */
    public static BigDecimal getLateFeeRate(int lateDays) {
        if (lateDays <= 3) {
            return DAY_1_TO_3.getRate();
        } else if (lateDays <= 7) {
            return DAY_4_TO_7.getRate();
        } else if (lateDays <= 15) {
            return DAY_8_TO_15.getRate();
        } else if (lateDays <= 30) {
            return DAY_16_TO_30.getRate();
        } else if (lateDays <= 60) {
            return DAY_31_TO_60.getRate();
        } else if (lateDays <= 90) {
            return DAY_61_TO_90.getRate();
        } else {
            return OVER_90_DAYS.getRate();
        }
    }
}
