package com.financial.model.veriffFullAutoModels;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Document {
    private ConfidenceValue number;
    private Type type;
    private Country country;
    private ConfidenceValue validUntil;
    private ConfidenceValue validFrom;
}
