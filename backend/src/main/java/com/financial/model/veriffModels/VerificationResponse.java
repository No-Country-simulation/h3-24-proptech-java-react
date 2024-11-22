package com.financial.model.veriffModels;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerificationResponse {
    private String status;
    private String eventType;
    private String sessionId;
    private String attemptId;
    private String vendorData;
    private String endUserId;
    private String version;
    private String acceptanceTime;
    private String time;
    private Data data;
}
