package com.datalingo.one.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data

@AllArgsConstructor
@NoArgsConstructor

@Builder

public class QueryLog {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String queryText;
    private String tableName;
    private LocalDateTime timestamp;

}
