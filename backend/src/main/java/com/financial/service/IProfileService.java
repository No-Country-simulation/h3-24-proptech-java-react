package com.financial.service;

import com.financial.dto.request.profile.RequestCreateProfileDTO;
import com.financial.dto.response.profile.ResponseProfileDTO;
import com.financial.model.User;

import java.util.UUID;

public interface IProfileService {

    void createProfile(RequestCreateProfileDTO requestCreateProfileDTO, User user);

    ResponseProfileDTO findProfileByUserIdOrDni(String userIdOrDni);

    ResponseProfileDTO findProfileByUserIdOrThrowIfNotFound(UUID userId);

    ResponseProfileDTO findProfileByDniOrThrowIfNotFound(String dni);

    ResponseProfileDTO updateProfile(String userIdOrDni, UUID profileId, RequestCreateProfileDTO profileDto);

}
