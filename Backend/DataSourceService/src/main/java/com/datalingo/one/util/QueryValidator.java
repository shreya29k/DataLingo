package com.datalingo.one.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

@Component
@Slf4j
public class QueryValidator {

    private static final List<String> DANGEROUS_KEYWORDS = Arrays.asList(
        "DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "CREATE", "TRUNCATE",
        "GRANT", "REVOKE", "EXEC", "EXECUTE", "CALL", "MERGE", "REPLACE",
        "LOAD", "OUTFILE", "DUMPFILE", "INTO OUTFILE", "INTO DUMPFILE"
    );

    private static final List<Pattern> DANGEROUS_PATTERNS = Arrays.asList(
        Pattern.compile("--.*", Pattern.CASE_INSENSITIVE),
        Pattern.compile("/\\*.*?\\*/", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        Pattern.compile(".*;.*", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bUNION\\b.*\\bSELECT\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bOR\\b.*\\b1\\s*=\\s*1\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bAND\\b.*\\b1\\s*=\\s*1\\b", Pattern.CASE_INSENSITIVE)
    );

    public boolean isQuerySafe(String query) {
        if (query == null || query.trim().isEmpty()) {
            return false;
        }

        String upperQuery = query.toUpperCase().trim();
        
        // Check for dangerous keywords at the start
        for (String keyword : DANGEROUS_KEYWORDS) {
            if (upperQuery.startsWith(keyword + " ")) {
                log.warn("Dangerous keyword detected: {}", keyword);
                return false;
            }
        }
        
        // Check for dangerous patterns
        for (Pattern pattern : DANGEROUS_PATTERNS) {
            if (pattern.matcher(query).find()) {
                log.warn("Dangerous pattern detected: {}", pattern.pattern());
                return false;
            }
        }
        
        // Must start with SELECT (for read-only operations)
        if (!upperQuery.startsWith("SELECT")) {
            log.warn("Query must start with SELECT for safety");
            return false;
        }
        
        return true;
    }

    public String sanitizeQuery(String query) {
        if (query == null) return null;
        
        // Remove potential SQL injection attempts
        return query.replaceAll("--.*", "")
                   .replaceAll("/\\*.*?\\*/", "")
                   .trim();
    }
}

