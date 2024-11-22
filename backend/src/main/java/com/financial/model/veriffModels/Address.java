package com.financial.model.veriffModels;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Address {
    private String confidenceCategory;
    private String value;
    private AddressComponents components;
}
