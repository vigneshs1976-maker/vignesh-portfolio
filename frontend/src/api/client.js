const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    let detail = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      detail = body;
    } catch {
      // response wasn't JSON — keep the generic message
    }
    const error = new Error('API request failed');
    error.status = res.status;
    error.detail = detail;
    throw error;
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getPortfolio: () => request('/api/portfolio/'),
  sendContactMessage: (payload) =>
    request('/api/contact/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  resumeUrl: `${API_BASE_URL}/api/resume/`,
  baseUrl: API_BASE_URL,
};
