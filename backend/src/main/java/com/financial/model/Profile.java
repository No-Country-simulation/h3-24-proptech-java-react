package com.financial.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profiles")
public class Profile extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "profile_id")
    private UUID profileId;
    @Column(name = "date_of_birth")
    LocalDate dateOfBirth;
    @Column
    private String nationality;
    @Column
    private String road;
    @Column
    private String houseNumber;
    @Column
    private String city;
    @Column
    private String state;
    @Column
    private String country;
    @Column
    private String gender;

}
