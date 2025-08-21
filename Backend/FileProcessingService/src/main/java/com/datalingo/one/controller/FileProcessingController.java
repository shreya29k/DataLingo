package com.datalingo.one.controller;

import com.datalingo.one.model.dto.FileUploadResponse;
import com.datalingo.one.model.entity.ProcessedFile;
import com.datalingo.one.service.FileProcessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

/**
 * REST Controller for file processing operations
 */
@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*") // Enable CORS for frontend integration
public class FileProcessingController {
    
    @Autowired
    private FileProcessingService fileProcessingService;
    
    /**
     * Upload and process a file (Excel or CSV)
     */
    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            FileUploadResponse response = fileProcessingService.processFile(file);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            FileUploadResponse errorResponse = new FileUploadResponse();
            errorResponse.setMessage("File upload failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    /**
     * Get all processed files
     */
    @GetMapping("/all")
    public ResponseEntity<List<ProcessedFile>> getAllProcessedFiles() {
        List<ProcessedFile> files = fileProcessingService.getAllProcessedFiles();
        return ResponseEntity.ok(files);
    }
    
    /**
     * Get file by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProcessedFile> getFileById(@PathVariable Long id) {
        ProcessedFile file = fileProcessingService.getFileById(id);
        if (file != null) {
            return ResponseEntity.ok(file);
        }
        return ResponseEntity.notFound().build();
    }
    
    /**
     * Delete a processed file
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id) {
        boolean deleted = fileProcessingService.deleteFile(id);
        if (deleted) {
            return ResponseEntity.ok("File deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("File Processing Service is running!");
    }
}