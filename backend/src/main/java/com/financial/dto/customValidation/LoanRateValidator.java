package com.financial.dto.customValidation;

import com.financial.model.enums.LoanRate;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.reflect.Method;

public class LoanRateValidator implements ConstraintValidator<ValidLoanRate, Integer> {

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // Se considera válido si es null; usa @NotNull si quieres que no sea null.
        }

        // Verificar si el valor existe en el enum LoanRate
        for (LoanRate rate : LoanRate.values()) {
            if (rate.getMonths() == value) {
                return true;
            }
        }
        return false;
    }
}