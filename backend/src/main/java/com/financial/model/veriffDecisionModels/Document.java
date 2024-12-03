package com.financial.model.veriffDecisionModels;

import java.time.LocalDate;

public record Document(
        String number,
        String type,
        String country,
        LocalDate validUntil
) {
}
