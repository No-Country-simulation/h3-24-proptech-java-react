package com.financial.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.financial.model.CloudFile;
import com.financial.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FileUploaderServiceImpl implements FileUploadService {
    private final Cloudinary cloudinary;

    @Override
    public CloudFile uploadFile(MultipartFile file) {
        Map<?, ?> options = ObjectUtils.asMap(
                "folder", "financial-al",
                "resource_type", "auto",
                "use_filename", true,
                "unique_filename", true
        );
        return uploadFile(file, options);
    }

    private CloudFile uploadFile(MultipartFile file, Map<?, ?> options) {
        try {
            return tryUploadFile(file, options);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private CloudFile tryUploadFile(MultipartFile file, Map<?, ?> options) throws IOException {
        String fileName = file.getOriginalFilename();
        // Create a temporary file to upload to cloudinary
        File tempFile = File.createTempFile(getFileNameWithoutExtension(fileName), getFileExtension(fileName));
        file.transferTo(tempFile);
        var result = cloudinary.uploader().upload(tempFile, options);
        String publicId = (String) result.get("public_id");
        String url = (String) result.get("secure_url");
        tempFile.delete();
        return new CloudFile(publicId, url, fileName);
    }

    private String getFileNameWithoutExtension(String fileName) {
        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return fileName;
        }
        return fileName.substring(0, lastIndexOf);
    }

    private String getFileExtension(String fileName) {
        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return fileName.substring(lastIndexOf);
    }

    @Override
    public void deleteFile(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
