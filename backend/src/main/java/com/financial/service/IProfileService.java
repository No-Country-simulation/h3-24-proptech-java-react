package com.financial.service;

import com.financial.model.Profile;

import java.time.LocalDate;
import java.util.UUID;

public interface IProfileService {
    void createProfileDecision(LocalDate dateOfBirth, String nationality, String road, String houseNumber, String city, String state, String country, String gender);
    Profile findProfileByUserId(UUID userId);
    Profile findProfileByDni(String dni);

}
