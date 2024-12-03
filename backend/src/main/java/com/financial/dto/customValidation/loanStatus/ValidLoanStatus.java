package com.financial.dto.customValidation.loanStatus;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = LoanStatusValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
    public @interface ValidLoanStatus {

    String message() default "Invalid LoanStatus";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}