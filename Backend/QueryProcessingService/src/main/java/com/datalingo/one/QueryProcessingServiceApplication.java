package com.datalingo.one;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication(exclude = {
	    SecurityAutoConfiguration.class,
	    ReactiveSecurityAutoConfiguration.class,
	    org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration.class
	})
@EnableDiscoveryClient
public class QueryProcessingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(QueryProcessingServiceApplication.class, args);
	}

}
