package com.datalingo.one.client;

import com.datalingo.one.model.dto.DataSourceConnectionDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Feign Client to communicate with DataSource Service
 */
@FeignClient(name = "datasource-service", url = "${datasource.service.url:http://localhost:8082}")
public interface DataSourceServiceClient {
    
    /**
     * Create a new data source connection for the processed file
     */
    @PostMapping("/api/datasources/create")
    ResponseEntity<String> createDataSource(@RequestBody DataSourceConnectionDto connectionDto);
}