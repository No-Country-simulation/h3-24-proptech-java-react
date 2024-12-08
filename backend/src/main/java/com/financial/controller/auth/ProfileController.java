package com.financial.controller.auth;

import com.financial.config.CurrentUser;
import com.financial.dto.request.profile.RequestCreateProfileDTO;
import com.financial.dto.response.profile.ResponseProfileDTO;
import com.financial.model.User;
import com.financial.service.IProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users/profiles")
@RequiredArgsConstructor
public class ProfileController {
    private final IProfileService profileService;

    @GetMapping
    public ResponseEntity<ResponseProfileDTO> getProfile(@CurrentUser User user) {
        ResponseProfileDTO profile = profileService.findProfileByUserIdOrDni(user.getUserId().toString());
        return ResponseEntity.ok(profile);
    }

    @PostMapping
    public ResponseEntity<ResponseProfileDTO> createProfile(
            @PathVariable String userIdOrDni,
            @RequestBody @Valid RequestCreateProfileDTO profileDto
    ) {
        ResponseProfileDTO createdProfile = profileService.createProfile(userIdOrDni, profileDto);
        return new ResponseEntity<>(createdProfile, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<ResponseProfileDTO> updateProfile(
            @CurrentUser User user,
            @RequestBody @Valid RequestCreateProfileDTO profileDto
    ) {
        ResponseProfileDTO updatedProfile = profileService.updateProfile(user.getUserId(), profileDto);
        return ResponseEntity.ok(updatedProfile);
    }

    @DeleteMapping("/{profileId}")
    public ResponseEntity<Void> deleteProfile(@PathVariable String userIdOrDni, @PathVariable UUID profileId) {
        profileService.deleteProfile(userIdOrDni, profileId);
        return ResponseEntity.noContent().build();
    }
}
