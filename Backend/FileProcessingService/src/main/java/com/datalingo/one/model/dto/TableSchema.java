package com.datalingo.one.model.dto;

import java.util.List;
import java.util.Map;

/**
 * DTO to represent table schema information
 */
public class TableSchema {
    
    private String tableName;
    private List<ColumnInfo> columns;
    private Integer rowCount;
    
    public static class ColumnInfo {
        private String name;
        private String dataType;
        private boolean nullable;
        
        public ColumnInfo() {}
        
        public ColumnInfo(String name, String dataType, boolean nullable) {
            this.name = name;
            this.dataType = dataType;
            this.nullable = nullable;
        }
        
        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getDataType() { return dataType; }
        public void setDataType(String dataType) { this.dataType = dataType; }
        
        public boolean isNullable() { return nullable; }
        public void setNullable(boolean nullable) { this.nullable = nullable; }
    }
    
    // Constructors
    public TableSchema() {}
    
    public TableSchema(String tableName, List<ColumnInfo> columns, Integer rowCount) {
        this.tableName = tableName;
        this.columns = columns;
        this.rowCount = rowCount;
    }
    
    // Getters and Setters
    public String getTableName() { return tableName; }
    public void setTableName(String tableName) { this.tableName = tableName; }
    
    public List<ColumnInfo> getColumns() { return columns; }
    public void setColumns(List<ColumnInfo> columns) { this.columns = columns; }
    
    public Integer getRowCount() { return rowCount; }
    public void setRowCount(Integer rowCount) { this.rowCount = rowCount; }
}