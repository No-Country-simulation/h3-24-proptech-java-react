package com.financial.dto.response.profile;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseProfileDTO {
    private UUID profileId;
    private UUID userId;
    private LocalDate dateOfBirth;
    private String nationality;
    private String road;
    private String houseNumber;
    private String city;
    private String state;
    private String country;
    private String gender;
    private String economicActivity;
    private BigDecimal monthlyIncome;
    private String bankAccountCbu;
    private String firstNameAsInDni;
    private String lastNameAsInDni;
    private String educationLevel;
    private String mobilePhone;
    private String landlinePhone;
}