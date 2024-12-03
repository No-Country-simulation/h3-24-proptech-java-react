package com.financial.model.veriffFullAutoModels;


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
