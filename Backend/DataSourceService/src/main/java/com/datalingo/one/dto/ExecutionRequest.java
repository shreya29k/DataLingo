package com.datalingo.one.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import java.util.Map;

@Data
public class ExecutionRequest {
    @NotBlank
    private String query;
    
    @JsonProperty("database_type")
    private String databaseType = "MYSQL";
    
    private Map<String, Object> parameters;
    
    @JsonProperty("request_id")
    private String requestId;
    
    @JsonProperty("limit_results")
    private Integer limitResults = 1000;
    
    @JsonProperty("timeout_seconds")
    private Integer timeoutSeconds = 30;
}