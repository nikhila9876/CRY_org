/**
 * Authentication API Service for CRY NGO360
 * Adheres to Section 16 & Section 17 (Milestone 42)
 */

import apiClient, { IS_MOCK } from './apiClient';
import { MOCK_USERS } from '../mock/data/mockUsers';

export const authService = {
  /**
   * Login user with credentials or demo role
   */
  async login({ email, password, role = 'cry_staff' }) {
    if (IS_MOCK) {
      // Find matching mock user by role or email
      const matched =
        MOCK_USERS.find((u) => u.email === email) ||
        MOCK_USERS.find((u) => u.role === role) ||
        MOCK_USERS[0];

      const token = `jwt-${matched.role}-${Date.now()}`;
      localStorage.setItem('cry_ngo360_token', token);
      localStorage.setItem('cry_ngo360_user', JSON.stringify(matched));

      return apiClient.simulateMockResponse({
        token,
        user: matched,
      });
    }

    const response = await apiClient.post('/auth/login', { email, password, role });
    if (response.data?.token) {
      localStorage.setItem('cry_ngo360_token', response.data.token);
      localStorage.setItem('cry_ngo360_user', JSON.stringify(response.data.user));
    }
    return response;
  },

  /**
   * Log out user and flush tokens
   */
  async logout() {
    try {
      if (!IS_MOCK) {
        await apiClient.post('/auth/logout');
      }
    } catch {
      // Suppress network error during logout
    } finally {
      localStorage.removeItem('cry_ngo360_token');
      localStorage.removeItem('cry_ngo360_user');
      localStorage.removeItem('ngo360_token');
      localStorage.removeItem('ngo360_user');
      localStorage.removeItem('ngo360_role');
    }
    return { success: true };
  },

  /**
   * Retrieve current authenticated user profile
   */
  async getCurrentUser() {
    if (IS_MOCK) {
      const cached = localStorage.getItem('cry_ngo360_user');
      const user = cached ? JSON.parse(cached) : MOCK_USERS[0];
      return apiClient.simulateMockResponse(user);
    }
    return apiClient.get('/auth/me');
  },

  /**
   * Refresh JWT token
   */
  async refreshToken() {
    if (IS_MOCK) {
      const newToken = `refreshed-jwt-${Date.now()}`;
      localStorage.setItem('cry_ngo360_token', newToken);
      return apiClient.simulateMockResponse({ token: newToken });
    }
    const response = await apiClient.post('/auth/refresh');
    if (response.data?.token) {
      localStorage.setItem('cry_ngo360_token', response.data.token);
    }
    return response;
  },

  /**
   * Update profile metadata
   */
  async updateProfile(profileData) {
    if (IS_MOCK) {
      const cached = localStorage.getItem('cry_ngo360_user');
      const user = cached ? JSON.parse(cached) : MOCK_USERS[0];
      const updated = { ...user, ...profileData };
      localStorage.setItem('cry_ngo360_user', JSON.stringify(updated));
      return apiClient.simulateMockResponse(updated);
    }
    return apiClient.put('/auth/profile', profileData);
  },
};

export default authService;
