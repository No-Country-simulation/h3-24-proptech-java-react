package com.financial.dto.customValidation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ValueOfEnumValidator implements ConstraintValidator<ValueOfEnum, CharSequence> {
    private List<String> acceptedValues;

    @Override
    public void initialize(ValueOfEnum annotation) {
        acceptedValues = Stream.of(annotation.enumClass().getEnumConstants())
                .map(enumConstant -> enumConstant.name().toLowerCase(Locale.ENGLISH))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        context.disableDefaultConstraintViolation();
        String errorMessage = String.format("Value '%s' is invalid. Value must be one of %s", value, acceptedValues);
        context.buildConstraintViolationWithTemplate(errorMessage).addConstraintViolation();
        return acceptedValues.contains(value.toString().toLowerCase(Locale.ENGLISH));
    }

}