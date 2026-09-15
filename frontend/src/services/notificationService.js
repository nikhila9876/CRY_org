/**
 * Notification API Service for CRY NGO360
 * Adheres to Section 16 & Section 17 (Milestone 45)
 */

import apiClient, { IS_MOCK } from './apiClient';
import { MOCK_ALERTS } from '../mock/data/mockAlerts';

export const notificationService = {
  /**
   * Retrieve notification alerts filtered by recipient role, category, or read status
   */
  async getNotifications(params = {}) {
    if (IS_MOCK) {
      let filtered = [...MOCK_ALERTS];
      if (params.role) {
        filtered = filtered.filter((a) => a.recipientRole === params.role || a.recipientRole === 'all');
      }
      if (params.category && params.category !== 'all') {
        filtered = filtered.filter((a) => a.category === params.category);
      }
      if (params.unreadOnly) {
        filtered = filtered.filter((a) => !a.isRead);
      }
      return apiClient.simulateMockResponse(filtered);
    }
    return apiClient.get('/notifications', { params });
  },

  /**
   * Mark a single notification alert as read
   */
  async markAsRead(id) {
    if (IS_MOCK) {
      const target = MOCK_ALERTS.find((a) => a.id === id);
      if (target) target.isRead = true;
      return apiClient.simulateMockResponse({ success: true, id });
    }
    return apiClient.patch(`/notifications/${id}/read`);
  },

  /**
   * Mark all alerts for user/role as read
   */
  async markAllAsRead(role) {
    if (IS_MOCK) {
      MOCK_ALERTS.forEach((a) => {
        if (!role || a.recipientRole === role) {
          a.isRead = true;
        }
      });
      return apiClient.simulateMockResponse({ success: true });
    }
    return apiClient.post('/notifications/mark-all-read', { role });
  },

  /**
   * Dismiss or delete notification
   */
  async deleteNotification(id) {
    if (IS_MOCK) {
      return apiClient.simulateMockResponse({ success: true, id });
    }
    return apiClient.delete(`/notifications/${id}`);
  },
};

export default notificationService;
