package com.financial.model.veriffFullAutoModels;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class Verification {
    private double decisionScore;
    private String decision;
    private Person person;
    private Document document;
    private List<Insight> insights;
}
