package com.datalingo.one.service;

import com.opencsv.CSVReader;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

@Service
public class FileService {

    public List<String> extractSheetNamesOrHeaders(MultipartFile file, String fileType) {
        try {
            if (fileType.equalsIgnoreCase("EXCEL")) {
                return extractSheetNames(file.getInputStream());
            } else if (fileType.equalsIgnoreCase("CSV")) {
                return extractCsvHeaders(file.getInputStream());
            } else {
                throw new IllegalArgumentException("Unsupported file type: " + fileType);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse file: " + e.getMessage(), e);
        }
    }

    private List<String> extractSheetNames(InputStream inputStream) throws Exception {
        Workbook workbook = WorkbookFactory.create(inputStream);
        List<String> sheetNames = new ArrayList<>();
        for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
            sheetNames.add(workbook.getSheetName(i));
        }
        workbook.close();
        return sheetNames;
    }

    private List<String> extractCsvHeaders(InputStream inputStream) throws Exception {
        CSVReader reader = new CSVReader(new InputStreamReader(inputStream));
        String[] headers = reader.readNext();
        reader.close();
        return headers != null ? Arrays.asList(headers) : Collections.emptyList();
    }
}