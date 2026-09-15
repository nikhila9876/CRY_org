/**
 * Task API Service for CRY NGO360
 * Adheres to Section 16 & Section 17 (Milestone 43)
 */

import apiClient, { IS_MOCK } from './apiClient';
import { MOCK_TASKS } from '../mock/data/mockTasks';

export const taskService = {
  /**
   * List tasks with filters for NGO, priority, due category, and completion
   */
  async getTasks(params = {}) {
    if (IS_MOCK) {
      let filtered = [...MOCK_TASKS];
      if (params.ngoId) {
        filtered = filtered.filter((t) => t.ngoId === params.ngoId);
      }
      if (params.priority && params.priority !== 'all') {
        filtered = filtered.filter((t) => t.priority === params.priority);
      }
      if (params.dueCategory && params.dueCategory !== 'all') {
        filtered = filtered.filter((t) => t.dueCategory === params.dueCategory);
      }
      if (params.status && params.status !== 'all') {
        filtered = filtered.filter((t) => t.status === params.status);
      }
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query) ||
            t.requiredDocument?.toLowerCase().includes(query)
        );
      }
      return apiClient.simulateMockResponse(filtered);
    }
    return apiClient.get('/tasks', { params });
  },

  /**
   * Get single task by ID
   */
  async getTaskById(id) {
    if (IS_MOCK) {
      const task = MOCK_TASKS.find((t) => t.id === id) || MOCK_TASKS[0];
      return apiClient.simulateMockResponse(task);
    }
    return apiClient.get(`/tasks/${id}`);
  },

  /**
   * Create a new task deliverable
   */
  async createTask(taskData) {
    if (IS_MOCK) {
      const newTask = {
        ...taskData,
        id: `tsk-${Date.now()}`,
        status: 'pending',
        countdownText: 'Due Soon',
      };
      return apiClient.simulateMockResponse(newTask);
    }
    return apiClient.post('/tasks', taskData);
  },

  /**
   * Toggle or update task status
   */
  async updateTaskStatus(id, newStatus) {
    if (IS_MOCK) {
      const task = MOCK_TASKS.find((t) => t.id === id) || MOCK_TASKS[0];
      const updated = {
        ...task,
        status: newStatus,
        dueCategory: newStatus === 'completed' ? 'completed' : task.dueCategory,
      };
      return apiClient.simulateMockResponse(updated);
    }
    return apiClient.patch(`/tasks/${id}/status`, { status: newStatus });
  },

  /**
   * Retrieve upcoming urgent deadlines (Due today, overdue, or due in 7 days)
   */
  async getUpcomingDeadlines(ngoId) {
    if (IS_MOCK) {
      const filtered = MOCK_TASKS.filter(
        (t) =>
          (!ngoId || t.ngoId === ngoId) &&
          t.status !== 'completed' &&
          (t.dueCategory === 'today' || t.dueCategory === 'this_week')
      );
      return apiClient.simulateMockResponse(filtered);
    }
    return apiClient.get('/tasks/deadlines', { params: { ngoId } });
  },
};

export default taskService;
