package com.financial.controller;

import com.financial.dto.request.profile.RequestCreateProfileDTO;
import com.financial.dto.response.profile.ResponseProfileDTO;
import com.financial.service.IProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users/{userIdOrDni}/profiles")
@RequiredArgsConstructor
public class ProfileController {
    private final IProfileService profileService;

    @GetMapping
    public ResponseEntity<ResponseProfileDTO> getProfile(@PathVariable String userIdOrDni) {
        ResponseProfileDTO profile = profileService.findProfileByUserIdOrDni(userIdOrDni);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/{profileId}")
    public ResponseEntity<ResponseProfileDTO> updateProfile(
            @PathVariable String userIdOrDni,
            @PathVariable UUID profileId,
            @RequestBody @Valid RequestCreateProfileDTO profileDto
    ) {
        ResponseProfileDTO updatedProfile = profileService.updateProfile(userIdOrDni, profileId, profileDto);
        return ResponseEntity.ok(updatedProfile);
    }

}
