package com.datalingo.one.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    
    @Override
    public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
        // Set Spring's async timeout to 90 seconds (less than WebClient timeout)
        configurer.setDefaultTimeout(90_000);  // 90 seconds
    }
}