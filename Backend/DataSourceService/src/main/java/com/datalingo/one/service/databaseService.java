package com.datalingo.one.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;

import javax.sql.DataSource;

import java.util.ArrayList;
import java.util.List;

@Service
public class databaseService {

    private final JdbcTemplate jdbcTemplate;
    private final MongoClient mongoClient;

    @Autowired
    public databaseService(DataSource dataSource, MongoClient mongoClient) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        this.mongoClient = mongoClient;
    }

    public List<String> fetchTables(String databaseType) {
        switch (databaseType.toUpperCase()) {
            case "MYSQL":
                return jdbcTemplate.queryForList(
                    "SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE()",
                    String.class
                );

            case "POSTGRESQL":
                return jdbcTemplate.queryForList(
                    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
                    String.class
                );

            case "MONGODB":
                return fetchMongoCollections();

            default:
                throw new IllegalArgumentException("Unsupported database type: " + databaseType);
        }
    }

    private List<String> fetchMongoCollections() {
        MongoDatabase db = mongoClient.getDatabase("your_db_name"); // Replace with dynamic DB name if needed
        return db.listCollectionNames()
                 .into(new ArrayList<>());
    }
}
