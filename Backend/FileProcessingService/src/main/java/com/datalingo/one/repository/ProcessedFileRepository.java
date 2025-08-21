package com.datalingo.one.repository;

import com.datalingo.one.model.entity.ProcessedFile;
import com.datalingo.one.model.enums.ProcessingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for ProcessedFile entity
 */
@Repository
public interface ProcessedFileRepository extends JpaRepository<ProcessedFile, Long> {
    
    /**
     * Find files by processing status
     */
    List<ProcessedFile> findByStatus(ProcessingStatus status);
    
    /**
     * Find file by original file name
     */
    Optional<ProcessedFile> findByOriginalFileName(String originalFileName);
    
    /**
     * Find files by data source ID
     */
    List<ProcessedFile> findByDataSourceId(String dataSourceId);
    
    /**
     * Find file by table name
     */
    Optional<ProcessedFile> findByTableName(String tableName);
}
