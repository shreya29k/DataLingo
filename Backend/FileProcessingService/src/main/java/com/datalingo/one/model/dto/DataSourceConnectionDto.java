package com.datalingo.one.model.dto;

public class DataSourceConnectionDto {
    
    private String name;
    private String type;
    private String connectionString;
    private TableSchema schema;
    private String fileId;
    
    // Constructors
    public DataSourceConnectionDto() {}
    
    public DataSourceConnectionDto(String name, String type, TableSchema schema, String fileId) {
        this.name = name;
        this.type = type;
        this.schema = schema;
        this.fileId = fileId;
    }
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getConnectionString() { return connectionString; }
    public void setConnectionString(String connectionString) { this.connectionString = connectionString; }
    
    public TableSchema getSchema() { return schema; }
    public void setSchema(TableSchema schema) { this.schema = schema; }
    
    public String getFileId() { return fileId; }
    public void setFileId(String fileId) { this.fileId = fileId; }
}
