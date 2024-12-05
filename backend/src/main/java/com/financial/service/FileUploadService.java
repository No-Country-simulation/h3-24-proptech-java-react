package com.financial.service;

import com.financial.model.CloudFile;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    CloudFile uploadFile(MultipartFile file);
    void deleteFile(String publicId);
}
