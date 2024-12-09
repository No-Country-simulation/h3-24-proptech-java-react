package com.financial.service;

import com.financial.dto.request.profile.RequestCreateProfileDTO;
import com.financial.dto.response.profile.ResponseProfileDTO;
import com.financial.model.User;

import java.util.UUID;

public interface IProfileService {
    void createProfileWithUser(RequestCreateProfileDTO requestCreateProfileDTO, User user);
    ResponseProfileDTO createProfile(String userIdOrDni, RequestCreateProfileDTO profileDto);
    ResponseProfileDTO findProfileByUserIdOrDni(String userIdOrDni);
    ResponseProfileDTO findProfileByUserIdOrThrowIfNotFound(UUID userId);
    ResponseProfileDTO findProfileByDniOrThrowIfNotFound(String dni);
    ResponseProfileDTO updateProfile(String userIdOrDni, UUID profileId, RequestCreateProfileDTO profileDto);
    ResponseProfileDTO updateProfile(UUID userIdOrDni, RequestCreateProfileDTO profileDto);
    void deleteProfile(String userIdOrDni, UUID profileId);
}
