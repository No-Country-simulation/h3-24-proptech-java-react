package com.financial.model.veriffFullAutoModels;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Address {
    private String confidenceCategory;
    private String value;
    private AddressComponents components;
}
