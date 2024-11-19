package com.financial.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CloudFile {
    @Column(name = "public_id")
    private String publicId;

    @Column
    private String url;

    @Column(name = "original_file_name")
    private String originalFilename;

    public boolean isValidFile() {
        boolean publicIdValid = Objects.nonNull(publicId) && !publicId.isBlank();
        boolean urlValid = Objects.nonNull(url) && !url.isBlank();
        return publicIdValid && urlValid;
    }

}
