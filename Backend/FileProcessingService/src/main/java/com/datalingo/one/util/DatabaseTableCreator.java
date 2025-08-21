package com.datalingo.one.util;

import com.datalingo.one.model.dto.TableSchema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.StringJoiner;
import java.util.ArrayList;

@Component
public class DatabaseTableCreator {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    /**
     * Create database table from schema and insert data
     */
    public void createTableFromSchema(TableSchema schema, List<String[]> dataRows) {
        // Drop table if exists
        String dropTableSql = "DROP TABLE IF EXISTS " + schema.getTableName();
        jdbcTemplate.execute(dropTableSql);
        
        // Create table
        StringBuilder createTableSql = new StringBuilder();
        createTableSql.append("CREATE TABLE ").append(schema.getTableName()).append(" (");
        createTableSql.append("id BIGINT AUTO_INCREMENT PRIMARY KEY, ");
        
        StringJoiner columnJoiner = new StringJoiner(", ");
        for (TableSchema.ColumnInfo column : schema.getColumns()) {
            columnJoiner.add(column.getName() + " " + column.getDataType());
        }
        
        createTableSql.append(columnJoiner.toString()).append(")");
        
        jdbcTemplate.execute(createTableSql.toString());
        
        // Insert data
        if (!dataRows.isEmpty()) {
            insertDataIntoTable(schema.getTableName(), schema.getColumns(), dataRows);
        }
    }
    
    /**
     * Insert data rows into the created table
     */
    private void insertDataIntoTable(String tableName, List<TableSchema.ColumnInfo> columns, List<String[]> dataRows) {
        StringBuilder insertSql = new StringBuilder();
        insertSql.append("INSERT INTO ").append(tableName).append(" (");
        
        StringJoiner columnNames = new StringJoiner(", ");
        for (TableSchema.ColumnInfo column : columns) {
            columnNames.add(column.getName());
        }
        insertSql.append(columnNames.toString()).append(") VALUES (");
        
        StringJoiner placeholders = new StringJoiner(", ");
        for (int i = 0; i < columns.size(); i++) {
            placeholders.add("?");
        }
        insertSql.append(placeholders.toString()).append(")");
        
        // Batch insert for better performance
        List<Object[]> batchArgs = new ArrayList<>();
        for (String[] row : dataRows) {
            Object[] args = new Object[columns.size()];
            for (int i = 0; i < columns.size() && i < row.length; i++) {
                args[i] = row[i].isEmpty() ? null : row[i];
            }
            batchArgs.add(args);
        }
        
        jdbcTemplate.batchUpdate(insertSql.toString(), batchArgs);
    }
}
