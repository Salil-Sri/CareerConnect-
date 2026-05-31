// API Configuration
const normalizeApiBaseUrl = (value) => {
  const rawValue = (value || "").trim();

  if (!rawValue) {
    return "http://localhost:4000/api";
  }

  const withProtocol = rawValue.startsWith("http://") || rawValue.startsWith("https://")
    ? rawValue
    : `https://${rawValue}`;

  return withProtocol.replace(/\/?$/, "").replace(/\/api\/?$/, "/api");
};

export const API_BASE_URL = normalizeApiBaseUrl(
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL,
);

// Base server URL (without /api) — useful for direct file links
export const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    VERIFY_TOKEN: `${API_BASE_URL}/auth/verify`,
  },
  JOBS: {
    GET_ALL: `${API_BASE_URL}/jobs`,
    GET_ONE: (id) => `${API_BASE_URL}/jobs/${id}`,
    CREATE: `${API_BASE_URL}/jobs`,
  },
  RESUMES: {
    UPLOAD: `${API_BASE_URL}/resumes/upload`,
    ANALYZE: `${API_BASE_URL}/resumes/analyze`,
  },
};

export default API_BASE_URL;
