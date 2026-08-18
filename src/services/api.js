/**
 * Base API configuration.
 * Replace mock implementations with real HTTP calls when backend is ready.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Simulates network delay for mock responses.
 */
export function simulateDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    credentials: 'include',
    headers: { ...DEFAULT_HEADERS, ...options.headers },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed: ${response.status}`);
  }

  return response.json();
}

export { API_BASE_URL };
