package com.datalingo.one.controller;

import com.datalingo.one.service.DatabaseHealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class HealthController {

    private final DatabaseHealthService databaseHealthService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getOverallHealth() {
        Map<String, Boolean> dbHealth = databaseHealthService.checkDatabaseConnections();
        boolean allHealthy = dbHealth.values().stream().allMatch(Boolean::booleanValue);
        
        Map<String, Object> response = Map.of(
            "status", allHealthy ? "UP" : "DOWN",
            "databases", dbHealth
        );
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/database/{type}")
    public ResponseEntity<Map<String, Object>> getDatabaseHealth(@PathVariable String type) {
        boolean isHealthy = databaseHealthService.isDatabaseHealthy(type);
        
        Map<String, Object> response = Map.of(
            "database", type.toUpperCase(),
            "status", isHealthy ? "UP" : "DOWN"
        );
        
        return ResponseEntity.ok(response);
    }
}