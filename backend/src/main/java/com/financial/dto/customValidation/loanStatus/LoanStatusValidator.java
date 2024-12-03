package com.financial.dto.customValidation.loanStatus;

import com.financial.model.enums.LoanStatus;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class LoanStatusValidator implements ConstraintValidator<ValidLoanStatus, String> {

    @Override
    public void initialize(ValidLoanStatus constraintAnnotation) {

    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.trim().isEmpty()) {
            return true;
        }
        try {
            LoanStatus.valueOf(value.trim().toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}