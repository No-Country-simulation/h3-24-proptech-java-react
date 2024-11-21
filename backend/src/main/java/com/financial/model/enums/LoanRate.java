package com.financial.model.enums;

import java.math.BigDecimal;

public enum LoanRate {
    SIX(6, new BigDecimal("0.184496")),
    NINE(9, new BigDecimal("0.125780")),
    TWELVE(12, new BigDecimal("0.096453")),
    EIGHTEEN(18, new BigDecimal("0.067190")),
    TWENTY_FOUR(24, new BigDecimal("0.055246")),
    THIRTY(30, new BigDecimal("0.043922")),
    THIRTY_SIX(36, new BigDecimal("0.038157")),
    FORTY_EIGHT(48, new BigDecimal("0.031049")),
    SIXTY(60, new BigDecimal("0.026880")),
    SEVENTY_TWO(72, new BigDecimal("0.024171")),
    EIGHTY_FOUR(84, new BigDecimal("0.022302")),
    NINETY_SIX(96, new BigDecimal("0.020948")),
    ONE_TWENTY(120, new BigDecimal("0.019173")),
    ONE_FIFTY(150, new BigDecimal("0.017913")),
    ONE_EIGHTY(180, new BigDecimal("0.017199"));

    private final int months;
    private final BigDecimal rate;

    LoanRate(int months, BigDecimal rate) {
        this.months = months;
        this.rate = rate;
    }

    public int getMonths() {
        return months;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public static BigDecimal getRateByMonths(int months) {
        for (LoanRate rate : values()) {
            if (rate.getMonths() == months) {
                return rate.getRate();
            }
        }
        throw new IllegalArgumentException("Invalid term: " + months);
    }
}
