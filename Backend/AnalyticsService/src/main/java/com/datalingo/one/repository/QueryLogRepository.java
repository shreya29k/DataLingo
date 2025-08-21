package com.datalingo.one.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.datalingo.one.model.*;

public interface QueryLogRepository extends JpaRepository<QueryLog,Long> {

	
	List<QueryLog> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
}
