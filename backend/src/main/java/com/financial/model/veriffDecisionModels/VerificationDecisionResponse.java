package com.financial.model.veriffDecisionModels;

public record VerificationDecisionResponse(
        String status,
        Verification verification
) {
}
