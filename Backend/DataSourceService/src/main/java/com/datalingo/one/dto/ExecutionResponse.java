package com.datalingo.one.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder 
public class ExecutionResponse {
    private boolean success;
    
    private List<Map<String, Object>> data;
    
    @JsonProperty("row_count")
    private Integer rowCount;
    
    private List<ColumnInfo> columns;
    
    @JsonProperty("execution_time_ms")
    private Long executionTimeMs;
    
    private String query;
    
    @JsonProperty("database_type")
    private String databaseType;
    
    @JsonProperty("request_id")
    private String requestId;
    
    private String error;
    
    private List<String> warnings;
    
    private LocalDateTime timestamp;
    
    // Constructor for easy error responses
    public ExecutionResponse(boolean success, String error) {
        this.success = success;
        this.error = error;
        this.timestamp = LocalDateTime.now();
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ColumnInfo {
        private String name;
        private String type;
        private boolean nullable;
    }

	
}