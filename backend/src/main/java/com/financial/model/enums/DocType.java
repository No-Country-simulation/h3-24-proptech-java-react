package com.financial.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DocType {
    IDENTITY_FRONT(1, 1),
    IDENTITY_BACK(1, 1),

    SALARY_RECEIPT(3, -1),

    SERVICE_RECEIPT(1, 1);

    private final int minCount;
    private final int maxCount;

    public boolean onlyOneUploadIsAllowed() {
        return this.minCount == 1;
    }

}
