package com.datalingo.one.util;

import com.datalingo.one.exception.FileProcessingException;
import com.datalingo.one.exception.UnsupportedFileTypeException;
import com.datalingo.one.model.enums.FileType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileValidator {
    
    @Value("${file.max-size:10485760}") // Default 10MB
    private long maxFileSize;
    
    /**
     * Validate uploaded file
     */
    public void validateFile(MultipartFile file) throws FileProcessingException {
        if (file == null || file.isEmpty()) {
            throw new FileProcessingException("File is empty");
        }
        
        // Check file size
        if (file.getSize() > maxFileSize) {
            throw new FileProcessingException("File size exceeds maximum allowed size of " + 
                                            (maxFileSize / 1024 / 1024) + "MB");
        }
        
        // Check file type
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.trim().isEmpty()) {
            throw new FileProcessingException("Invalid file name");
        }
        
        try {
            FileType.fromFileName(fileName);
        } catch (IllegalArgumentException e) {
            throw new UnsupportedFileTypeException("Unsupported file type. Only CSV, XLS, and XLSX files are supported.");
        }
        
        // Check if file has extension
        if (!fileName.contains(".")) {
            throw new FileProcessingException("File must have a valid extension");
        }
    }
}