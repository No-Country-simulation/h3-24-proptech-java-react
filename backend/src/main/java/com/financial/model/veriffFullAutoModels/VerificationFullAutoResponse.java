package com.financial.model.veriffFullAutoModels;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerificationFullAutoResponse {
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
