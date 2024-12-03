package com.financial.model.veriffDecisionModels;

import java.time.LocalDateTime;
import java.util.UUID;

public record Verification(
        UUID id,
        String status,
        UUID vendorData,
        Person person,
        Document document
) {
}
