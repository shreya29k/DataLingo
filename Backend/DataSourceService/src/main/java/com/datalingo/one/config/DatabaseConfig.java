package com.datalingo.one.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DatabaseConfig {

    @Value("${mysql.datasource.url}")
    private String mysqlUrl;
    
    @Value("${mysql.datasource.username}")
    private String mysqlUsername;
    
    @Value("${mysql.datasource.password}")
    private String mysqlPassword;
    
    @Value("${postgresql.datasource.url}")
    private String postgresUrl;
    
    @Value("${postgresql.datasource.username}")
    private String postgresUsername;
    
    @Value("${postgresql.datasource.password}")
    private String postgresPassword;

    @Bean
    @Primary
    public DataSource mysqlDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(mysqlUrl);
        config.setUsername(mysqlUsername);
        config.setPassword(mysqlPassword);
        config.setDriverClassName("com.mysql.cj.jdbc.Driver");
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);
        return new HikariDataSource(config);
    }

    @Bean
    public DataSource postgresDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(postgresUrl);
        config.setUsername(postgresUsername);
        config.setPassword(postgresPassword);
        config.setDriverClassName("org.postgresql.Driver");
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);
        return new HikariDataSource(config);
    }

    @Bean
    public Map<String, DataSource> dataSourceMap() {
        Map<String, DataSource> dataSources = new HashMap<>();
        dataSources.put("MYSQL", mysqlDataSource());
        dataSources.put("POSTGRESQL", postgresDataSource());
        return dataSources;
    }

    @Bean
    public JdbcTemplate mysqlJdbcTemplate() {
        return new JdbcTemplate(mysqlDataSource());
    }

    @Bean
    public JdbcTemplate postgresJdbcTemplate() {
        return new JdbcTemplate(postgresDataSource());
    }
}