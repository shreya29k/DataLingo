package com.datalingo.one.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class DatabaseHealthService {

    private final Map<String, DataSource> dataSourceMap;

    public Map<String, Boolean> checkDatabaseConnections() {
        Map<String, Boolean> healthStatus = new HashMap<>();
        
        for (Map.Entry<String, DataSource> entry : dataSourceMap.entrySet()) {
            String dbType = entry.getKey();
            DataSource dataSource = entry.getValue();
            
            try {
                JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
                jdbcTemplate.queryForObject("SELECT 1", Integer.class);
                healthStatus.put(dbType, true);
                log.debug("Database {} is healthy", dbType);
            } catch (Exception e) {
                healthStatus.put(dbType, false);
                log.error("Database {} is unhealthy: {}", dbType, e.getMessage());
            }
        }
        
        return healthStatus;
    }

    public boolean isDatabaseHealthy(String databaseType) {
        DataSource dataSource = dataSourceMap.get(databaseType.toUpperCase());
        if (dataSource == null) {
            return false;
        }
        
        try {
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return true;
        } catch (Exception e) {
            log.error("Database {} health check failed: {}", databaseType, e.getMessage());
            return false;
        }
    }
}