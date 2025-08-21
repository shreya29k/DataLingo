package com.datalingo.one.exception;

public class UnsupportedFileTypeException extends FileProcessingException {
    public UnsupportedFileTypeException(String message) {
        super(message);
    }
    
    public UnsupportedFileTypeException(String message, Throwable cause) {
        super(message, cause);
    }
}