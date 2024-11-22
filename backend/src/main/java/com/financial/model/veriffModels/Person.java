package com.financial.model.veriffModels;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Person {
    private ConfidenceValue firstName;
    private ConfidenceValue lastName;
    private ConfidenceValue dateOfBirth;
    private ConfidenceValue gender;
    private ConfidenceValue idNumber;
    private ConfidenceValue nationality;
    private Address address;
}
