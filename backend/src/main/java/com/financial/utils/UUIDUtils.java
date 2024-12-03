package com.financial.utils;

import java.util.UUID;

public class UUIDUtils {

    public static boolean looksLikeUUID(String str) {
        if (str == null) {
            return false;
        }
        try {
            UUID.fromString(str);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

}
