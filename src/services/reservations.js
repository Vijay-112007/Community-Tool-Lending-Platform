import { mockReservations } from '../data/mockData';
import { simulateDelay } from './api';

const USE_MOCK = true;

/**
 * Submit a borrow request.
 * Future: POST /api/reservations
 */
export async function createReservation({ toolId, startDate, endDate }) {
  if (USE_MOCK) {
    await simulateDelay(600);

    const reservation = {
      id: Date.now(),
      toolId,
      userId: 1,
      startDate,
      endDate,
      status: 'pending',
    };

    mockReservations.push(reservation);
    return reservation;
  }

  const { apiRequest } = await import('./api');
  return apiRequest('/reservations', {
    method: 'POST',
    body: JSON.stringify({ toolId, startDate, endDate }),
  });
}

/**
 * Check if user has a pending reservation for a tool.
 * Future: GET /api/reservations?toolId=:id&status=pending
 */
export async function getPendingReservationForTool(toolId) {
  if (USE_MOCK) {
    await simulateDelay(200);
    return mockReservations.find(
      (r) => r.toolId === Number(toolId) && r.status === 'pending'
    ) || null;
  }

  const { apiRequest } = await import('./api');
  return apiRequest(`/reservations?toolId=${toolId}&status=pending`);
}
