/**
 * Central API Client for CRY NGO360
 * Adheres to Section 16 & Section 17 (Milestone 41)
 *
 * Configurable via VITE_API_BASE_URL and VITE_ENABLE_MOCK_API.
 * Features automatic JWT injection, error normalization, and mock fallback.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
export const IS_MOCK = import.meta.env.VITE_ENABLE_MOCK_API !== 'false';

/**
 * Normalizes API response errors into standard format
 */
export function normalizeError(error) {
  if (error.response) {
    return {
      success: false,
      status: error.response.status,
      message: error.response.data?.message || 'Server error occurred',
      data: error.response.data || null,
    };
  } else if (error.request) {
    return {
      success: false,
      status: 0,
      message: 'Network connection unavailable or server unreachable',
      data: null,
    };
  }
  return {
    success: false,
    status: 500,
    message: error.message || 'An unexpected client error occurred',
    data: null,
  };
}

/**
 * Retrieves authentication bearer token from local storage
 */
function getAuthToken() {
  try {
    return localStorage.getItem('cry_ngo360_token') || null;
  } catch {
    return null;
  }
}

/**
 * Central request executor using standard Fetch API
 */
async function request(endpoint, { method = 'GET', body, headers = {}, ...customConfig } = {}) {
  const token = getAuthToken();
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...customConfig,
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type');
    let data = null;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const err = new Error(data?.message || `HTTP ${response.status}: ${response.statusText}`);
      err.response = { status: response.status, data };
      throw err;
    }

    return {
      success: true,
      status: response.status,
      data: data?.data !== undefined ? data.data : data,
      raw: data,
    };
  } catch (error) {
    const normalized = normalizeError(error);
    console.warn(`[apiClient] ${method} ${url} failed:`, normalized.message);
    throw normalized;
  }
}

/**
 * Mock simulator helper for simulated API latency
 */
export async function simulateMockResponse(data, delayMs = 250) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return {
    success: true,
    status: 200,
    data,
  };
}

export const apiClient = {
  get: (endpoint, config) => request(endpoint, { ...config, method: 'GET' }),
  post: (endpoint, body, config) => request(endpoint, { ...config, method: 'POST', body }),
  put: (endpoint, body, config) => request(endpoint, { ...config, method: 'PUT', body }),
  patch: (endpoint, body, config) => request(endpoint, { ...config, method: 'PATCH', body }),
  delete: (endpoint, config) => request(endpoint, { ...config, method: 'DELETE' }),
  simulateMockResponse,
  IS_MOCK,
  API_BASE_URL,
};

export default apiClient;
