import { User } from '@/data/mockApps';
import api from './apiService';

// Constants for caching token validation
const TOKEN_VALIDATION_CACHE_KEY = 'token_validation_cache';
const TOKEN_VALIDATION_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Authentication service for interacting with backend API
 */
export const authService = {
  /**
   * Verify a Google OAuth token with the backend
   * @param token Google OAuth token
   * @returns Promise with JWT token and user data if successful
   */
  verifyToken: async (token: string): Promise<{ token: string, user: User } | null> => {
    try {
      if (!token) {
        throw new Error('No token provided');
      }

      const response = await api.post('/auth/verify', { token });
      return response.data;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  },

  /**
   * Validates if the current JWT token is still valid with caching
   * @returns Promise with validity status
   */
  validateToken: async (): Promise<boolean> => {
    try {
      // Check if we have a cached validation result
      const cachedValidation = localStorage.getItem(TOKEN_VALIDATION_CACHE_KEY);
      
      if (cachedValidation) {
        const { timestamp, valid } = JSON.parse(cachedValidation);
        const now = Date.now();
        
        // If the cache is still fresh, return the cached result
        if (now - timestamp < TOKEN_VALIDATION_EXPIRY) {
          console.log('Using cached token validation result');
          return valid;
        }
      }
      
      // No cache or expired cache, make API call
      console.log('Token validation cache miss - calling API');
      const response = await api.get('/auth/validate');
      const valid = response.data.valid === true;
      
      // Cache the result
      localStorage.setItem(
        TOKEN_VALIDATION_CACHE_KEY, 
        JSON.stringify({ timestamp: Date.now(), valid })
      );
      
      return valid;
    } catch (error) {
      console.error('Token validation failed:', error);
      
      // Clear invalid cache on error
      localStorage.removeItem(TOKEN_VALIDATION_CACHE_KEY);
      return false;
    }
  },

  /**
   * Add authorization header to requests
   * @param headers Existing headers object
   * @returns Headers with authorization
   */
  // Use the getAuthConfig from apiService directly
  getAuthConfig: () => {
    // Import this function from apiService when needed
    const token = localStorage.getItem('manager_assistant_token');
    if (token) {
      return {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    }
    return {};
  },
  
};
