package com.datalingo.one.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

@Configuration
public class MongoConfig {
	@Value("${mongodb.uri}")
	private String mongoUri;

	@Value("${mongodb.database}")
	private String mongoDbName;

	@Bean
	public MongoClient mongoClient() {
	    return MongoClients.create(mongoUri);
	}

	@Bean
	public MongoDatabase mongoDatabase(MongoClient mongoClient) {
	    return mongoClient.getDatabase(mongoDbName);
	}


}
