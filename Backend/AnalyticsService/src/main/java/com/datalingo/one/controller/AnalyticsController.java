package com.datalingo.one.controller;



import java.util.List;


import org.springframework.web.bind.annotation.*;

import com.datalingo.one.model.QueryLog;
import com.datalingo.one.service.AnalyticsService;


@RestController



public class AnalyticsController {
	private final AnalyticsService service;

    public AnalyticsController(AnalyticsService service) {
        this.service = service;
    }

    @PostMapping("/log")
    public void logQuery(@RequestParam String query, @RequestParam String table) {
        service.logQuery(query, table);
    }

    @GetMapping("/today")
    public List<QueryLog> getTodayLogs() {
        return service.getTodayLogs();
        
    
    }

}
