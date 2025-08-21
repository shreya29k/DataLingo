package com.datalingo.one.config;



import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Data;

@Component
@ConfigurationProperties(prefix = "mistral")
@Data
public class MistralConfig {
    
    private String modelName = "mistral:7b-instruct-q4_K_M";
    private String baseUrl = "http://localhost:11434";
    private int timeoutSeconds = 120;  // 2 minutes - should be longer than Spring's timeout
    private double temperature = 0.1;
    private double topP = 0.9;
    private int maxTokens = 300;  // Reduced for faster response
    
    public boolean isValid() {
        return modelName != null && !modelName.trim().isEmpty() &&
               baseUrl != null && !baseUrl.trim().isEmpty() &&
               timeoutSeconds > 0;
    }
}
