package com.datalingo.one.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class QueryResponse {
    @JsonProperty("generatedQuery")
    private String generatedQuery;
    
    @JsonProperty("databaseType")
    private String databaseType;
    
    @JsonProperty("queryType")
    private String queryType;
    
    private List<String> warnings;
    
    private QueryMetadata metadata;
    
    @JsonProperty("processingTimeMs")
    private Long processingTimeMs;
    
    @JsonProperty("requestId")
    private String requestId;
    
    private boolean executable;
    
    @Data
    public static class QueryMetadata {
        private Double timestamp;
        private String model;
        
        @JsonProperty("tables_involved")
        private List<String> tablesInvolved;
    }
}
