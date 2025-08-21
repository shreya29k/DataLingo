package com.datalingo.one.service;

import org.springframework.stereotype.Service;

import com.datalingo.one.model.*;
import com.datalingo.one.repository.*;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class AnalyticsService {
	private final QueryLogRepository repository;

    public AnalyticsService(QueryLogRepository repository) {
        this.repository = repository;
    }

    public void logQuery(String query, String table) {
        QueryLog log = QueryLog.builder()
                .queryText(query)
                .tableName(table)
                .timestamp(LocalDateTime.now())
                .build();
        repository.save(log);
    }

    public List<QueryLog> getTodayLogs() {
        LocalDateTime start = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime end = LocalDateTime.now();
        return repository.findByTimestampBetween(start, end);
    }

}