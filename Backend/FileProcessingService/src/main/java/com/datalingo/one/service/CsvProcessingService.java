package com.datalingo.one.service;

import com.datalingo.one.model.entity.ProcessedFile;
import com.datalingo.one.model.dto.TableSchema;
import com.datalingo.one.util.DatabaseTableCreator;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvProcessingService {
    
    @Autowired
    private DatabaseTableCreator tableCreator;
    
    /**
     * Process CSV file and create database table
     */
    public void processCsvFile(ProcessedFile processedFile) throws Exception {
        try (CSVReader csvReader = new CSVReader(new FileReader(processedFile.getFilePath()))) {
            
            // Read all records
            List<String[]> records = csvReader.readAll();
            
            if (records.isEmpty()) {
                throw new Exception("CSV file is empty");
            }
            
            // First row contains headers
            String[] headers = records.get(0);
            List<String[]> dataRows = records.subList(1, records.size());
            
            // Generate table name
            String tableName = generateTableName(processedFile.getOriginalFileName());
            processedFile.setTableName(tableName);
            
            // Create table schema
            TableSchema schema = createSchemaFromCsv(headers, dataRows, tableName);
            
            // Create database table and insert data
            tableCreator.createTableFromSchema(schema, dataRows);
            
            // Update file metadata
            processedFile.setRowCount(dataRows.size());
            processedFile.setColumnCount(headers.length);
            
        } catch (Exception e) {
            throw new Exception("Failed to process CSV file: " + e.getMessage(), e);
        }
    }
    
    /**
     * Create table schema from CSV data
     */
    private TableSchema createSchemaFromCsv(String[] headers, List<String[]> dataRows, String tableName) {
        List<TableSchema.ColumnInfo> columns = new ArrayList<>();
        
        for (int i = 0; i < headers.length; i++) {
            String columnName = cleanColumnName(headers[i]);
            String dataType = inferDataType(dataRows, i);
            
            columns.add(new TableSchema.ColumnInfo(columnName, dataType, true));
        }
        
        return new TableSchema(tableName, columns, dataRows.size());
    }
    
    /**
     * Infer data type from sample data
     */
    private String inferDataType(List<String[]> dataRows, int columnIndex) {
        for (String[] row : dataRows) {
            if (columnIndex < row.length && row[columnIndex] != null && !row[columnIndex].trim().isEmpty()) {
                String value = row[columnIndex].trim();
                
                try {
                    Long.parseLong(value);
                    return "BIGINT";
                } catch (NumberFormatException e1) {
                    try {
                        Double.parseDouble(value);
                        return "DECIMAL(15,2)";
                    } catch (NumberFormatException e2) {
                        if (value.matches("\\d{4}-\\d{2}-\\d{2}.*") || 
                            value.matches("\\d{2}/\\d{2}/\\d{4}.*")) {
                            return "TIMESTAMP";
                        }
                        return "VARCHAR(255)";
                    }
                }
            }
        }
        return "VARCHAR(255)";
    }
    
    /**
     * Clean column name for database compatibility
     */
    private String cleanColumnName(String columnName) {
        return columnName.trim()
                        .replaceAll("[^a-zA-Z0-9_]", "_")
                        .replaceAll("_{2,}", "_")
                        .toLowerCase();
    }
    
    /**
     * Generate table name from file name
     */
    private String generateTableName(String fileName) {
        String baseName = fileName.substring(0, fileName.lastIndexOf('.'));
        return "tbl_" + baseName.replaceAll("[^a-zA-Z0-9_]", "_").toLowerCase();
    }
}
