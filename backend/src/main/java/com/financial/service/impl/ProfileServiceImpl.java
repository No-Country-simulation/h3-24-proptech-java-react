package com.financial.service.impl;

import com.financial.model.Profile;
import com.financial.model.User;
import com.financial.repository.IProfileRepository;
import com.financial.service.IProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileServiceImpl implements IProfileService {

    private final IProfileRepository profileRepository;

    @Transactional
    @Override
    public void createProfileDecision(LocalDate dateOfBirth, String nationality, String road, String houseNumber, String city, String state, String country, String gender, User user) {
        Profile profile = Profile.builder()
                .dateOfBirth(dateOfBirth)
                .nationality(nationality)
                .road(road)
                .houseNumber(houseNumber)
                .city(city)
                .state(state)
                .country(country)
                .gender(gender)
                .user(user)
                .build();
        profileRepository.save(profile);
        log.info("Profile created: {}", profile);
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
