package com.financial.model.veriffFullAutoModels;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ConfidenceValue {
    private String confidenceCategory;
    private String value;
    private List<String> sources;
}
