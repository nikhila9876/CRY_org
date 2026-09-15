/**
 * Project API Service for CRY NGO360
 * Adheres to Section 16 & Section 17 (Milestone 43)
 */

import apiClient, { IS_MOCK } from './apiClient';
import { MOCK_PROJECTS } from '../mock/data/mockProjects';

export const projectService = {
  /**
   * List all projects with optional filtering by status, cycle, or NGO
   */
  async getProjects(params = {}) {
    if (IS_MOCK) {
      let filtered = [...MOCK_PROJECTS];
      if (params.status && params.status !== 'all') {
        filtered = filtered.filter((p) => p.status === params.status);
      }
      if (params.ngoId) {
        filtered = filtered.filter((p) => p.ngoId === params.ngoId);
      }
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.ngoName.toLowerCase().includes(query) ||
            p.code.toLowerCase().includes(query)
        );
      }
      return apiClient.simulateMockResponse(filtered);
    }
    return apiClient.get('/projects', { params });
  },

  /**
   * Get project details by ID
   */
  async getProjectById(id) {
    if (IS_MOCK) {
      const project = MOCK_PROJECTS.find((p) => p.id === id) || MOCK_PROJECTS[0];
      return apiClient.simulateMockResponse(project);
    }
    return apiClient.get(`/projects/${id}`);
  },

  /**
   * Get financial tranches & disbursement progress
   */
  async getProjectTranches(id) {
    if (IS_MOCK) {
      const project = MOCK_PROJECTS.find((p) => p.id === id) || MOCK_PROJECTS[0];
      const tranches = [
        { trancheNo: 1, percentage: 35, status: 'disbursed', amount: Math.round(project.budget * 0.35), date: '2025-04-10' },
        { trancheNo: 2, percentage: 35, status: project.disbursedTranche >= 2 ? 'disbursed' : 'pending', amount: Math.round(project.budget * 0.35), date: '2025-09-15' },
        { trancheNo: 3, percentage: 30, status: project.disbursedTranche >= 3 ? 'disbursed' : 'under_review', amount: Math.round(project.budget * 0.30), date: '2026-01-20' },
      ];
      return apiClient.simulateMockResponse(tranches);
    }
    return apiClient.get(`/projects/${id}/tranches`);
  },

  /**
   * Create new project record
   */
  async createProject(projectData) {
    if (IS_MOCK) {
      const newProj = {
        ...projectData,
        id: `proj-${Date.now()}`,
        code: `CRY-GEN-${new Date().getFullYear()}-${Math.floor(Math.random() * 90 + 10)}`,
        status: 'on_track',
      };
      return apiClient.simulateMockResponse(newProj);
    }
    return apiClient.post('/projects', projectData);
  },

  /**
   * Update existing project metadata
   */
  async updateProject(id, updates) {
    if (IS_MOCK) {
      const project = MOCK_PROJECTS.find((p) => p.id === id) || MOCK_PROJECTS[0];
      return apiClient.simulateMockResponse({ ...project, ...updates });
    }
    return apiClient.put(`/projects/${id}`, updates);
  },
};

export default projectService;
