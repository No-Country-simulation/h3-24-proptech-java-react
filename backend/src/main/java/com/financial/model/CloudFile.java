package com.financial.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cloud_files")
public class CloudFile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID cloudFileId;

    @Column(name = "public_id")
    private String publicId;

    @Column
    private String url;

    @Column(name = "original_file_name")
    private String originalFilename;

    public CloudFile(String publicId, String url, String originalFilename) {
        this.publicId = publicId;
        this.url = url;
        this.originalFilename = originalFilename;
    }

}
