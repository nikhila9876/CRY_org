/**
 * Field Visit API Service for CRY NGO360
 * Adheres to Section 16 & Section 17 (Milestone 45)
 */

import apiClient, { IS_MOCK } from './apiClient';
import { MOCK_FIELD_VISITS } from '../mock/data/mockFieldVisits';

export const fieldVisitService = {
  /**
   * Get all field visits with optional filtering
   */
  async getFieldVisits(params = {}) {
    if (IS_MOCK) {
      let filtered = [...MOCK_FIELD_VISITS];
      if (params.status && params.status !== 'all') {
        filtered = filtered.filter((v) => v.status === params.status);
      }
      if (params.ngoId) {
        filtered = filtered.filter((v) => v.ngoId === params.ngoId);
      }
      return apiClient.simulateMockResponse(filtered);
    }
    return apiClient.get('/field-visits', { params });
  },

  /**
   * Get single field visit details
   */
  async getFieldVisitById(id) {
    if (IS_MOCK) {
      const visit = MOCK_FIELD_VISITS.find((v) => v.id === id) || MOCK_FIELD_VISITS[0];
      return apiClient.simulateMockResponse(visit);
    }
    return apiClient.get(`/field-visits/${id}`);
  },

  /**
   * Schedule a new field visit
   */
  async scheduleFieldVisit(visitData) {
    if (IS_MOCK) {
      const newVisit = {
        ...visitData,
        id: `fv-${Date.now()}`,
        status: 'scheduled',
        cachedLocally: true,
        completedActivities: [],
      };
      return apiClient.simulateMockResponse(newVisit);
    }
    return apiClient.post('/field-visits', visitData);
  },

  /**
   * Update field visit notes, checklist, or activities
   */
  async updateFieldVisit(id, updates) {
    if (IS_MOCK) {
      const visit = MOCK_FIELD_VISITS.find((v) => v.id === id) || MOCK_FIELD_VISITS[0];
      const updated = { ...visit, ...updates };
      return apiClient.simulateMockResponse(updated);
    }
    return apiClient.put(`/field-visits/${id}`, updates);
  },

  /**
   * Synchronize offline recorded field visit mutations
   */
  async syncFieldVisit(id, syncPayload) {
    if (IS_MOCK) {
      const visit = MOCK_FIELD_VISITS.find((v) => v.id === id) || MOCK_FIELD_VISITS[0];
      const synced = {
        ...visit,
        ...syncPayload,
        status: 'synced',
        lastDraftSaved: new Date().toISOString(),
        pendingSync: false,
      };
      return apiClient.simulateMockResponse(synced, 500);
    }
    return apiClient.post(`/field-visits/${id}/sync`, syncPayload);
  },
};

export default fieldVisitService;
