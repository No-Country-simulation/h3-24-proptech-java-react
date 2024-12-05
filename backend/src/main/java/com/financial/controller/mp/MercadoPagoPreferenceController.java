package com.financial.controller.mp;

import com.financial.dto.response.mp.PreferenceResponseDTO;
import com.financial.service.IMercadoPagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/preferences")
@RequiredArgsConstructor
public class MercadoPagoPreferenceController {
    private final IMercadoPagoService preferenceService;

    @PostMapping("/{paymentId}")
    public ResponseEntity<PreferenceResponseDTO> createPreference(@PathVariable UUID paymentId) {
        PreferenceResponseDTO preference = preferenceService.createPreference(paymentId);
        return ResponseEntity.ok(preference);
    }

}
