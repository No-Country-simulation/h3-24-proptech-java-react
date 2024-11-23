package com.financial.model;


import jakarta.persistence.*;
import lombok.*;

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

    @OneToOne
    @JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "FK_PROFILE_USER"))
    private User user;

}
