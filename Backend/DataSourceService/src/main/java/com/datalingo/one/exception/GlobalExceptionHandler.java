package com.datalingo.one.exception;

import com.datalingo.one.dto.ExecutionResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<ExecutionResponse> handleValidationException(MethodArgumentNotValidException ex) {
//        log.error("Validation error: {}", ex.getMessage());
//        
//        ExecutionResponse response = ((Object) ExecutionResponse.builder())
//            .success(false)
//            .error("Validation failed: " + ex.getBindingResult().getFieldError().getDefaultMessage())
//            .timestamp(LocalDateTime.now())
//            .build();
//            
//        return ResponseEntity.badRequest().body(response);
   // }
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ExecutionResponse> handleValidationException(MethodArgumentNotValidException ex) {
	    log.error("Validation error: {}", ex.getMessage());

	    ExecutionResponse response = ExecutionResponse.builder()
	        .success(false)
	        .error("Validation failed: " + ex.getBindingResult().getFieldError().getDefaultMessage())
	        .timestamp(LocalDateTime.now())
	        .build();

	    return ResponseEntity.badRequest().body(response);
	}
    
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ExecutionResponse> handleBindException(BindException ex) {
        log.error("Binding error: {}", ex.getMessage());
        
        ExecutionResponse response = ExecutionResponse.builder()
            .success(false)
            .error("Request binding failed: " + ex.getBindingResult().getFieldError().getDefaultMessage())
            .timestamp(LocalDateTime.now())
            .build();
            
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExecutionResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.error("Illegal argument: {}", ex.getMessage());
        
        ExecutionResponse response = ExecutionResponse.builder()
            .success(false)
            .error("Invalid argument: " + ex.getMessage())
            .timestamp(LocalDateTime.now())
            .build();
            
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExecutionResponse> handleGenericException(Exception ex) {
        log.error("Unexpected error: {}", ex.getMessage(), ex);
        
        ExecutionResponse response = ExecutionResponse.builder()
            .success(false)
            .error("Internal server error: " + ex.getMessage())
            .timestamp(LocalDateTime.now())
            .build();
            
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}

    