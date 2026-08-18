import { mockBorrowings, mockBorrowingSummary } from '../data/mockData';
import { simulateDelay } from './api';

const USE_MOCK = true;

/**
 * Fetch the current user's borrowings.
 * Future: GET /api/borrowings
 */
export async function getBorrowings() {
  if (USE_MOCK) {
    await simulateDelay(400);
    return mockBorrowings;
  }

  const { apiRequest } = await import('./api');
  return apiRequest('/borrowings');
}

/**
 * Fetch borrowing summary counts.
 * Future: GET /api/borrowings/summary
 */
export async function getBorrowingSummary() {
  if (USE_MOCK) {
    await simulateDelay(300);
    return mockBorrowingSummary;
  }

  const { apiRequest } = await import('./api');
  return apiRequest('/borrowings/summary');
}
