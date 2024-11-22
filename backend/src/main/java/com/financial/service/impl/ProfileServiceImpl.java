package com.financial.service.impl;

import com.financial.model.Profile;
import com.financial.service.IProfileService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;


@Service
public class ProfileServiceImpl implements IProfileService {
    @Override
    public void createProfileDecision(LocalDate dateOfBirth, String nationality, String road, String houseNumber, String city, String state, String country, String gender) {

    }

    @Override
    public Profile findProfileByUserId(UUID userId) {
        return null;
    }

    @Override
    public Profile findProfileByDni(String dni) {
        return null;
    }
}
