import axios from 'axios';

// API base URL - configured from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Configure request interceptors for the API instance
 * Called in App.tsx to set up at application start
 */
export const setupApiInterceptors = () => {
  // Request interceptor to add auth token to all requests
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('manager_assistant_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle common errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 Unauthorized errors globally
      if (error.response && error.response.status === 401) {
        // Clear localStorage
        localStorage.removeItem('manager_assistant_token');
        localStorage.removeItem('manager_assistant_user');
        
        // Redirect to login page if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
};

/**
 * Get request config with auth header
 * @returns Axios request config with authorization
 */
export const getAuthConfig = () => {
  const token = localStorage.getItem('manager_assistant_token');
  if (token) {
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }
  return {};
};

export default api;
