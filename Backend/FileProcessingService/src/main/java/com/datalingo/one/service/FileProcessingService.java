package com.datalingo.one.service;

import com.datalingo.one.model.dto.FileUploadResponse;
import com.datalingo.one.model.entity.ProcessedFile;
import com.datalingo.one.model.enums.FileType;
import com.datalingo.one.model.enums.ProcessingStatus;
import com.datalingo.one.repository.ProcessedFileRepository;
import com.datalingo.one.util.FileValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Main service class for file processing operations
 */
@Service
public class FileProcessingService {
    
    @Autowired
    private ProcessedFileRepository processedFileRepository;
    
    @Autowired
    private ExcelProcessingService excelProcessingService;
    
    @Autowired
    private CsvProcessingService csvProcessingService;
    
    @Autowired
    private DataSourceIntegrationService dataSourceIntegrationService;
    
    @Autowired
    private FileValidator fileValidator;
    
    @Value("${file.upload.directory:./uploads}")
    private String uploadDirectory;
    
    /**
     * Process uploaded file (main method)
     */
    public FileUploadResponse processFile(MultipartFile file) {
        try {
            // Validate file
            fileValidator.validateFile(file);
            
            // Save file to filesystem
            String savedFileName = saveFile(file);
            FileType fileType = FileType.fromFileName(file.getOriginalFilename());
            
            // Create database record
            ProcessedFile processedFile = new ProcessedFile(
                savedFileName,
                file.getOriginalFilename(),
                fileType,
                uploadDirectory + "/" + savedFileName,
                file.getSize()
            );
            
            processedFile = processedFileRepository.save(processedFile);
            
            // Process file asynchronously
            processFileAsync(processedFile);
            
            return new FileUploadResponse(
                processedFile.getId(),
                processedFile.getOriginalFileName(),
                fileType,
                ProcessingStatus.PROCESSING,
                "File uploaded successfully and processing started"
            );
            
        } catch (Exception e) {
            return new FileUploadResponse(
                null,
                file.getOriginalFilename(),
                null,
                ProcessingStatus.FAILED,
                "Failed to process file: " + e.getMessage()
            );
        }
    }
    
    /**
     * Process file asynchronously
     */
    private void processFileAsync(ProcessedFile processedFile) {
        // In a real application, use @Async or a message queue
        new Thread(() -> {
            try {
                processedFile.setStatus(ProcessingStatus.PROCESSING);
                processedFileRepository.save(processedFile);
                
                // Process based on file type
                if (processedFile.getFileType() == FileType.CSV) {
                    csvProcessingService.processCsvFile(processedFile);
                } else {
                    excelProcessingService.processExcelFile(processedFile);
                }
                
                // Register with DataSource Service
                dataSourceIntegrationService.registerDataSource(processedFile);
                
                // Update status
                processedFile.setStatus(ProcessingStatus.READY_FOR_QUERY);
                processedFile.setProcessedAt(LocalDateTime.now());
                processedFileRepository.save(processedFile);
                
            } catch (Exception e) {
                processedFile.setStatus(ProcessingStatus.FAILED);
                processedFile.setErrorMessage(e.getMessage());
                processedFileRepository.save(processedFile);
            }
        }).start();
    }
    
    /**
     * Save uploaded file to filesystem
     */
    private String saveFile(MultipartFile file) throws Exception {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDirectory);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Generate unique filename
        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        String uniqueFileName = UUID.randomUUID().toString() + extension;
        
        // Save file
        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath);
        
        return uniqueFileName;
    }
    
    /**
     * Get all processed files
     */
    public List<ProcessedFile> getAllProcessedFiles() {
        return processedFileRepository.findAll();
    }
    
    /**
     * Get file by ID
     */
    public ProcessedFile getFileById(Long id) {
        return processedFileRepository.findById(id).orElse(null);
    }
    
    /**
     * Delete file
     */
    public boolean deleteFile(Long id) {
        try {
            ProcessedFile file = processedFileRepository.findById(id).orElse(null);
            if (file != null) {
                // Delete physical file
                Files.deleteIfExists(Paths.get(file.getFilePath()));
                // Delete database record
                processedFileRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}