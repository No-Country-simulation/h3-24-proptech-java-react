package com.financial.service.impl;

import com.financial.config.mapper.ProfileMapper;
import com.financial.dto.request.profile.RequestCreateProfileDTO;
import com.financial.dto.response.profile.ResponseProfileDTO;
import com.financial.exception.NotFoundException;
import com.financial.exception.ProfileNotFoundException;
import com.financial.model.Profile;
import com.financial.model.User;
import com.financial.repository.IProfileRepository;
import com.financial.service.IProfileService;
import com.financial.service.IUserService;
import com.financial.utils.UUIDUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileServiceImpl implements IProfileService {
    private final IProfileRepository profileRepository;
    private final IUserService userService;
    private final ProfileMapper profileMapper;

    private Profile findProfileById(UUID id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found for ID: " + id));
    }

    @Override
    public ResponseProfileDTO findProfileByUserIdOrDni(String userIdOrDni) {
        if (UUIDUtils.looksLikeUUID(userIdOrDni)) {
            return findProfileByUserIdOrThrowIfNotFound(UUID.fromString(userIdOrDni));
        } else {
            return findProfileByDniOrThrowIfNotFound(userIdOrDni);
        }
    }

    @Override
    public ResponseProfileDTO findProfileByUserIdOrThrowIfNotFound(UUID userId) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found for user ID: " + userId));
        return profileMapper.toResponseProfileDto(profile);
    }

    @Override
    public ResponseProfileDTO findProfileByDniOrThrowIfNotFound(String dni) {
        Profile profile = profileRepository.findProfileByUser_Dni(dni)
                .orElseThrow(() -> new NotFoundException("Profile not found for DNI: " + dni));
        return profileMapper.toResponseProfileDto(profile);
    }

    @Transactional
    @Override
    public void createProfileWithUser(RequestCreateProfileDTO profileDto, User user) {
        Profile profile = profileMapper.toProfile(profileDto);
        profile.setUser(user);
        profileRepository.save(profile);
        log.info("Profile created from decision: {}", profile.getProfileId());
    }

    @Transactional
    @Override
    public ResponseProfileDTO createProfile(String userIdOrDni, RequestCreateProfileDTO profileDto) {
        Optional<ResponseProfileDTO> profileMaybe = checkIfProfileExists(userIdOrDni);
        if (profileMaybe.isPresent()) {
            ResponseProfileDTO profile = profileMaybe.get();
            throw new RuntimeException("Profile already exists: " + profile.getProfileId());
        }
        User user = userService.findUserByIdOrDni(userIdOrDni);
        Profile profile = profileMapper.toProfile(profileDto);
        profile.setUser(user);
        Profile savedProfile = profileRepository.save(profile);
        log.info("Profile created: {}", savedProfile.getProfileId());
        return profileMapper.toResponseProfileDto(savedProfile);
    }

    private Optional<ResponseProfileDTO> checkIfProfileExists(String userIdOrDni) {
        try {
            return Optional.of(findProfileByUserIdOrDni(userIdOrDni));
        } catch (ProfileNotFoundException e) {
            return Optional.empty();
        }
    }

    @Transactional
    @Override
    public ResponseProfileDTO updateProfile(String userIdOrDni, UUID profileId, RequestCreateProfileDTO profileDto) {
        ensureProfileExists(userIdOrDni);
        Profile existingProfile = findProfileById(profileId);
        Profile updatedProfile = profileMapper.toProfile(profileDto);
        updatedProfile.setProfileId(existingProfile.getProfileId());
        updatedProfile.setUser(existingProfile.getUser());
        Profile savedProfile = profileRepository.save(updatedProfile);
        log.info("Profile updated: {}", savedProfile.getProfileId());
        return profileMapper.toResponseProfileDto(savedProfile);
    }

    @Transactional
    @Override
    public void deleteProfile(String userIdOrDni, UUID profileId) {
        ensureProfileExists(userIdOrDni);
        if (!profileRepository.existsById(profileId)) {
            throw new ProfileNotFoundException("Profile not found for ID: " + profileId);
        }
        profileRepository.deleteById(profileId);
        log.info("Profile deleted: {}", profileId);
    }

    private void ensureProfileExists(String userIdOrDni) {
        // This will throw if no profile is associated with the user id or dni provided
        findProfileByUserIdOrDni(userIdOrDni);
    }

}
