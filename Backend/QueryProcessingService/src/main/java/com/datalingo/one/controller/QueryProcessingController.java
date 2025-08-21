package com.datalingo.one.controller;

import com.datalingo.one.dto.QueryRequest;
import com.datalingo.one.dto.QueryResponse;
import com.datalingo.one.service.QueryProcessingService1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/query")
@Slf4j
public class QueryProcessingController {
    
    @Autowired
    private QueryProcessingService1 queryService;
    
    @PostMapping("/generate")
    public Mono<ResponseEntity<QueryResponse>> generateQuery(@RequestBody QueryRequest request) {
        log.info("Received query generation request for database: {}", request.getDatabaseType());
        
        return queryService.processQuery(request)
            .map(response -> {
                if (response.getGeneratedQuery().startsWith("ERROR:")) {
                    log.warn("Query generation failed: {}", response.getGeneratedQuery());
                    return ResponseEntity.status(500).body(response);
                } else {
                    log.info("Query generated successfully for request: {}", response.getRequestId());
                    return ResponseEntity.ok(response);
                }
            })
            .onErrorResume(error -> {
                log.error("Controller error: {}", error.getMessage());
                QueryResponse errorResponse = QueryResponse.builder()
                    .generatedQuery("ERROR: " + error.getMessage())
                    .databaseType(request.getDatabaseType())
                    .isExecutable(false)
                    .build();
                return Mono.just(ResponseEntity.status(500).body(errorResponse));
            });
    }
}