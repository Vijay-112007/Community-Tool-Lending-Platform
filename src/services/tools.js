import { mockTools } from '../data/mockData';
import { simulateDelay } from './api';

const USE_MOCK = true;

/**
 * Fetch all tools with optional filters.
 * Future: GET /api/tools
 */
export async function getTools({ search = '', category = 'All', availability = 'All' } = {}) {
  if (USE_MOCK) {
    await simulateDelay(500);

    let results = [...mockTools];

    if (search.trim()) {
      const query = search.toLowerCase();
      results = results.filter((tool) => tool.name.toLowerCase().includes(query));
    }

    if (category && category !== 'All') {
      results = results.filter((tool) => tool.category === category);
    }

    if (availability === 'Available') {
      results = results.filter((tool) => tool.availability === 'available');
    }

    return results;
  }

  const { apiRequest } = await import('./api');
  const params = new URLSearchParams({ search, category, availability });
  return apiRequest(`/tools?${params}`);
}

/**
 * Fetch a single tool by ID.
 * Future: GET /api/tools/:id
 */
export async function getToolById(id) {
  if (USE_MOCK) {
    await simulateDelay(400);
    const tool = mockTools.find((t) => t.id === Number(id));
    if (!tool) {
      throw new Error('Tool not found');
    }
    return tool;
  }

  const { apiRequest } = await import('./api');
  return apiRequest(`/tools/${id}`);
}

/**
 * Fetch recently added tools.
 * Future: GET /api/tools?sort=newest&limit=6
 */
export async function getRecentTools(limit = 6) {
  if (USE_MOCK) {
    await simulateDelay(300);
    return [...mockTools]
      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
      .slice(0, limit);
  }

  const { apiRequest } = await import('./api');
  return apiRequest(`/tools?sort=newest&limit=${limit}`);
}
