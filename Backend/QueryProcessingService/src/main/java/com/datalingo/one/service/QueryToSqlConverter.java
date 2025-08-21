package com.datalingo.one.service;

public interface QueryToSqlConverter {
    /**
     * Converts natural language query to SQL
     * @param naturalLanguageQuery The natural language query from user
     * @param tableSchema The database table schema information
     * @return Generated SQL query string
     * @throws RuntimeException if conversion fails
     */
    String convertToSql(String naturalLanguageQuery, String tableSchema);
    
    /**
     * Validates if the converter is properly configured
     * @return true if converter is ready to use
     */
    boolean isConfigured();
}