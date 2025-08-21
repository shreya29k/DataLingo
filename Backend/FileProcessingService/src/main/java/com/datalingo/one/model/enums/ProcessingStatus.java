package com.datalingo.one.model.enums;

public enum ProcessingStatus {
    UPLOADED,       // File uploaded successfully
    PROCESSING,     // File is being processed
    COMPLETED,      // Processing completed successfully
    FAILED,         // Processing failed
    READY_FOR_QUERY // File processed and ready for querying
}
