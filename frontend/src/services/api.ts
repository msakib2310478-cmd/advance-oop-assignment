import { FastLog, FastLogFormData } from '../types/FastLog';

/**
 * API Service for FastLog operations.
 * Provides abstraction for backend REST API communication using fetch API.
 */

const API_BASE_URL = 'http://localhost:8080/api/fastlogs';

/**
 * Helper function to handle fetch responses
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  
  // Handle empty responses (e.g., 204 No Content)
  const text = await response.text();
  return text ? JSON.parse(text) as T : ([] as unknown as T);
}

/**
 * Get all fasting logs
 */
export async function getAllFastLogs(): Promise<FastLog[]> {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse<FastLog[]>(response);
}

/**
 * Get a fasting log by ID
 */
export async function getFastLogById(id: number): Promise<FastLog> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse<FastLog>(response);
}

/**
 * Create a new fasting log
 */
export async function createFastLog(log: FastLogFormData): Promise<FastLog> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(log),
  });
  return handleResponse<FastLog>(response);
}

/**
 * Update an existing fasting log
 */
export async function updateFastLog(id: number, log: FastLogFormData): Promise<FastLog> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(log),
  });
  return handleResponse<FastLog>(response);
}

/**
 * Mark a fasting log as completed
 */
export async function markFastCompleted(id: number): Promise<FastLog> {
  const response = await fetch(`${API_BASE_URL}/${id}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse<FastLog>(response);
}

/**
 * Delete a fasting log
 */
export async function deleteFastLog(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
}

// Also export as object for backward compatibility
export const fastLogApi = {
  getAll: getAllFastLogs,
  getById: getFastLogById,
  create: createFastLog,
  update: updateFastLog,
  markAsCompleted: markFastCompleted,
  delete: deleteFastLog,
};

export default fastLogApi;
