package com.datalingo.one.service;

import com.datalingo.one.dto.ExecutionRequest;
import com.datalingo.one.dto.ExecutionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class QueryExecutionService {

    private final Map<String, DataSource> dataSourceMap;

    public ExecutionResponse executeQuery(ExecutionRequest request) {
        long startTime = System.currentTimeMillis();
        
        try {
            DataSource dataSource = getDataSource(request.getDatabaseType());
            if (dataSource == null) {
                return buildErrorResponse(request, "Unsupported database type: " + request.getDatabaseType(), startTime);
            }

            // Validate query safety
            if (!isQuerySafe(request.getQuery())) {
                return buildErrorResponse(request, "Query contains potentially unsafe operations", startTime);
            }

            // Execute with timeout
            return executeWithTimeout(dataSource, request, startTime);
            
        } catch (Exception e) {
            log.error("Error executing query: {}", e.getMessage(), e);
            return buildErrorResponse(request, "Query execution failed: " + e.getMessage(), startTime);
        }
    }

    private ExecutionResponse executeWithTimeout(DataSource dataSource, ExecutionRequest request, long startTime) {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        
        try {
            Future<ExecutionResponse> future = executor.submit(() -> executeQueryInternal(dataSource, request, startTime));
            return future.get(request.getTimeoutSeconds(), TimeUnit.SECONDS);
        } catch (TimeoutException e) {
            log.error("Query execution timed out after {} seconds", request.getTimeoutSeconds());
            return buildErrorResponse(request, "Query execution timed out", startTime);
        } catch (Exception e) {
            log.error("Error in query execution: {}", e.getMessage(), e);
            return buildErrorResponse(request, "Query execution error: " + e.getMessage(), startTime);
        } finally {
            executor.shutdownNow();
        }
    }

    private ExecutionResponse executeQueryInternal(DataSource dataSource, ExecutionRequest request, long startTime) {
        try (Connection connection = dataSource.getConnection()) {
            connection.setReadOnly(true);
            
            String query = request.getQuery();
            if (request.getLimitResults() != null && !query.toUpperCase().contains("LIMIT")) {
                query += " LIMIT " + request.getLimitResults();
            }

            try (PreparedStatement statement = connection.prepareStatement(query)) {
                // Set parameters if provided
                setParameters(statement, request.getParameters());
                
                try (ResultSet resultSet = statement.executeQuery()) {
                    return buildSuccessResponse(resultSet, request, startTime);
                }
            }
        } catch (SQLException e) {
            log.error("SQL execution error: {}", e.getMessage(), e);
            return buildErrorResponse(request, "SQL Error: " + e.getMessage(), startTime);
        }
    }

    private ExecutionResponse buildSuccessResponse(ResultSet resultSet, ExecutionRequest request, long startTime) throws SQLException {
        List<Map<String, Object>> data = new ArrayList<>();
        List<ExecutionResponse.ColumnInfo> columns = new ArrayList<>();
        
        ResultSetMetaData metaData = resultSet.getMetaData();
        int columnCount = metaData.getColumnCount();
        
        // Build column info
        for (int i = 1; i <= columnCount; i++) {
            ExecutionResponse.ColumnInfo columnInfo = new ExecutionResponse.ColumnInfo();
            columnInfo.setName(metaData.getColumnLabel(i));
            columnInfo.setType(metaData.getColumnTypeName(i));
            columnInfo.setNullable(metaData.isNullable(i) == ResultSetMetaData.columnNullable);
            columns.add(columnInfo);
        }
        
        // Process data rows
        int rowCount = 0;
        while (resultSet.next() && rowCount < request.getLimitResults()) {
            Map<String, Object> row = new LinkedHashMap<>();
            for (int i = 1; i <= columnCount; i++) {
                String columnName = metaData.getColumnLabel(i);
                Object value = resultSet.getObject(i);
                row.put(columnName, value);
            }
            data.add(row);
            rowCount++;
        }
        
        long executionTime = System.currentTimeMillis() - startTime;
        
        ExecutionResponse response = new ExecutionResponse();
        response.setSuccess(true);
        response.setData(data);
        response.setRowCount(rowCount);
        response.setColumns(columns);
        response.setExecutionTimeMs(executionTime);
        response.setQuery(request.getQuery());
        response.setDatabaseType(request.getDatabaseType());
        response.setRequestId(request.getRequestId());
        response.setTimestamp(LocalDateTime.now());
        
        return response;
    }

    private ExecutionResponse buildErrorResponse(ExecutionRequest request, String error, long startTime) {
        long executionTime = System.currentTimeMillis() - startTime;
        
        ExecutionResponse response = new ExecutionResponse();
        response.setSuccess(false);
        response.setError(error);
        response.setExecutionTimeMs(executionTime);
        response.setQuery(request.getQuery());
        response.setDatabaseType(request.getDatabaseType());
        response.setRequestId(request.getRequestId());
        response.setTimestamp(LocalDateTime.now());
        
        return response;
    }

    private DataSource getDataSource(String databaseType) {
        return dataSourceMap.get(databaseType.toUpperCase());
    }

    private boolean isQuerySafe(String query) {
        String upperQuery = query.toUpperCase().trim();
        
        // Block potentially dangerous operations
        String[] dangerousKeywords = {
            "DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "CREATE", "TRUNCATE",
            "GRANT", "REVOKE", "EXEC", "EXECUTE", "CALL", "MERGE"
        };
        
        for (String keyword : dangerousKeywords) {
            if (upperQuery.startsWith(keyword + " ")) {
                return false;
            }
        }
        
        return true;
    }

    private void setParameters(PreparedStatement statement, Map<String, Object> parameters) throws SQLException {
        if (parameters == null || parameters.isEmpty()) {
            return;
        }
        
        int index = 1;
        for (Object value : parameters.values()) {
            statement.setObject(index++, value);
        }
    }
}