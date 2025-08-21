// src/services/dataSourceService.js
// src/services/dataSourceService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/datasource';

export const executePromptQuery = async (payload) => {
  const response = await axios.post(`${BASE_URL}/query/prompt`, payload);
  return response.data;
};

export const executeDirectQuery = async (executionRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/query/execute`, executionRequest);
    return response.data;
  } catch (error) {
    console.error('Direct query failed:', error.response?.data || error.message);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error.message);
    throw error;
  }
};