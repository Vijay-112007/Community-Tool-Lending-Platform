import { mockNotifications } from '../data/mockData';
import { simulateDelay } from './api';

const USE_MOCK = true;

/**
 * Fetch user notifications.
 * Future: GET /api/notifications
 */
export async function getNotifications() {
  if (USE_MOCK) {
    await simulateDelay(300);
    return mockNotifications;
  }

  const { apiRequest } = await import('./api');
  return apiRequest('/notifications');
}

/**
 * Count unread notifications.
 */
export async function getUnreadCount() {
  const notifications = await getNotifications();
  return notifications.filter((n) => !n.read).length;
}
