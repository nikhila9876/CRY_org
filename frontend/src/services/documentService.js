/**
 * Document API Service for CRY NGO360
 * Adheres to Section 16 & Section 17 (Milestone 44)
 */

import apiClient, { IS_MOCK } from './apiClient';
import { MOCK_DOCUMENTS } from '../mock/data/mockDocuments';

export const documentService = {
  /**
   * List all documents with optional filters (status, ngoId, type, search)
   */
  async getDocuments(params = {}) {
    if (IS_MOCK) {
      let filtered = [...MOCK_DOCUMENTS];
      if (params.ngoId) {
        filtered = filtered.filter((d) => d.ngoId === params.ngoId);
      }
      if (params.status && params.status !== 'all') {
        filtered = filtered.filter((d) => d.status === params.status);
      }
      if (params.type && params.type !== 'all') {
        filtered = filtered.filter((d) => d.type === params.type);
      }
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (d) =>
            d.title.toLowerCase().includes(query) ||
            d.ngoName?.toLowerCase().includes(query) ||
            d.code.toLowerCase().includes(query)
        );
      }
      return apiClient.simulateMockResponse(filtered);
    }
    return apiClient.get('/documents', { params });
  },

  /**
   * Get single document details
   */
  async getDocumentById(id) {
    if (IS_MOCK) {
      const doc = MOCK_DOCUMENTS.find((d) => d.id === id) || MOCK_DOCUMENTS[0];
      return apiClient.simulateMockResponse(doc);
    }
    return apiClient.get(`/documents/${id}`);
  },

  /**
   * Upload a new compliance or financial document
   */
  async uploadDocument(uploadPayload) {
    if (IS_MOCK) {
      const newDoc = {
        id: `doc-${Date.now()}`,
        ngoId: uploadPayload.ngoId || 'ngo-1',
        ngoName: uploadPayload.ngoName || 'Bachpan Bachao Trust',
        title: uploadPayload.title || uploadPayload.name || 'Uploaded Compliance Document',
        type: uploadPayload.type || 'Utilization Certificate',
        code: `DOC-${Math.floor(Math.random() * 900 + 100)}`,
        status: 'pending_review',
        submissionDate: new Date().toISOString().split('T')[0],
        deadline: '2026-10-31',
        isOverdue: false,
        fileSize: uploadPayload.fileSize || '3.2 MB',
        fileType: 'PDF',
        version: 'v1',
        reviewer: null,
        feedbackReason: null,
        reviewedAt: null,
      };
      return apiClient.simulateMockResponse(newDoc, 400);
    }

    // Standard multipart form data for file uploads
    const formData = new FormData();
    Object.entries(uploadPayload).forEach(([key, val]) => {
      formData.append(key, val);
    });

    return apiClient.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * Review document workflow: Approve, Request Correction, or Reject
   */
  async reviewDocument(id, { decision, feedbackReason = '', reviewerName = 'CRY Staff' }) {
    if (IS_MOCK) {
      const doc = MOCK_DOCUMENTS.find((d) => d.id === id) || MOCK_DOCUMENTS[0];
      let newStatus = 'approved';
      if (decision === 'correction') newStatus = 'needs_correction';
      if (decision === 'reject') newStatus = 'rejected';

      const updated = {
        ...doc,
        status: newStatus,
        reviewer: reviewerName,
        feedbackReason: feedbackReason || null,
        reviewedAt: new Date().toISOString().split('T')[0],
      };
      return apiClient.simulateMockResponse(updated);
    }

    return apiClient.post(`/documents/${id}/review`, {
      decision,
      feedbackReason,
      reviewerName,
    });
  },

  /**
   * Retrieve verification checklist (DARPAN, FCRA, 12A/80G)
   */
  async getVerificationStatus(ngoId) {
    if (IS_MOCK) {
      const verification = {
        ngoId: ngoId || 'ngo-1',
        darpan: { verified: true, number: 'DL/2019/0241890', validTill: '2028-12-31' },
        fcra: { verified: false, number: 'FCRA-231660142', status: 'Renewal Pending With MHA' },
        tax12A: { verified: true, number: 'AAATB1234F', status: 'Active' },
        tax80G: { verified: true, number: '80G/DEL/2021', status: 'Active' },
      };
      return apiClient.simulateMockResponse(verification);
    }
    return apiClient.get(`/documents/verification/${ngoId}`);
  },
};

export default documentService;
