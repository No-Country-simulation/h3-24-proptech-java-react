package com.financial.model.veriffDecisionModels;

import java.time.LocalDate;

public record Person(
        String firstName,
        String lastName,
        String citizenship,
        String idNumber,
        String gender,
        LocalDate dateOfBirth,
        String nationality
) {
}
