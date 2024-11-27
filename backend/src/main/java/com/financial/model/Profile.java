package com.financial.model;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profiles")
public class Profile extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "profile_id")
    private UUID profileId;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_PROFILE_USER"))
    private User user;

    @Column
    private String nationality;

    @Column
    private String country;

    @Column
    private String state;

    @Column
    private String city;

    @Column
    private String road;

    @Column(name = "house_number")
    private String houseNumber;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column
    private String gender;

    @Column(name = "economic_activity")
    private String economicActivity;

    @Column(name = "monthly_income")
    private BigDecimal monthlyIncome;

    @Column(name = "bank_account_cbu")
    private String bankAccountCbu;

    @Column(name = "first_name_as_in_dni")
    private String firstNameAsInDni;

    @Column(name = "last_name_as_in_dni")
    private String lastNameAsInDni;

    @Column(name = "education_level")
    private String educationLevel;

    @Column(name = "mobile_phone")
    private String mobilePhone;

    @Column(name = "landline_phone")
    private String landlinePhone;

}
