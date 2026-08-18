import { mockUsers } from '../data/mockData';
import { simulateDelay } from './api';

const USE_MOCK = true;

/**
 * Fetch the currently authenticated user.
 * Future: GET /api/me (session cookie handled by browser)
 */
export async function getCurrentUser() {
  if (USE_MOCK) {
    await simulateDelay(200);
    return mockUsers.currentUser;
  }

  const { apiRequest } = await import('./api');
  return apiRequest('/me');
}
