import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { type User } from "@/data/mockApps";
import { authService } from "@/services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  googleLogin: () => void;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
  isTokenExpired: () => Promise<boolean>;
}

const TOKEN_KEY = "manager_assistant_token";
const USER_KEY = "manager_assistant_user";
const TOKEN_EXPIRY_KEY = "manager_assistant_token_expiry";
const TOKEN_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [freshLogin, setFreshLogin] = useState(false);
  const navigate = useNavigate();

  // Check if token is expired using stored timestamp or API validation if needed
  const isTokenExpired = useCallback(async (): Promise<boolean> => {
    if (!token) return true;
    
    // Skip validation if we just logged in
    if (freshLogin) {
      return false; // Token is fresh, so it's not expired
    }

    try {
      // Check if we have a stored expiry timestamp
      const storedExpiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
      const now = Date.now();
      
      if (storedExpiryTime) {
        const expiryTime = parseInt(storedExpiryTime, 10);
        
        // If we've checked recently (within TOKEN_CHECK_INTERVAL), use the stored value
        if (now < expiryTime) {
          return false; // Token is still valid according to our last check
        }
      }
      
      // If we don't have a timestamp or it's time to check again, validate with API
      const isValid = await authService.validateToken();
      
      // Update the expiry timestamp
      if (isValid) {
        // Set expiry time to current time + interval
        localStorage.setItem(TOKEN_EXPIRY_KEY, (now + TOKEN_CHECK_INTERVAL).toString());
      } else {
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
      }
      
      return !isValid;
    } catch (error) {
      console.error("Error checking token expiration:", error);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      return true;
    }
  }, [token, freshLogin]);

  // Handle user logout
  const logout = useCallback(() => {
    // Clear all auth-related items
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    localStorage.removeItem('token_validation_cache'); // Clear validation cache
    setUser(null);
    setToken(null);
    navigate("/login");
  }, [navigate]);

  // Verify token with backend service
  const verifyTokenWithBackend = useCallback(
    async (
      googleToken: string,
    ): Promise<{ token: string; user: User } | null> => {
      try {
        // Use our auth service to verify the token
        return await authService.verifyToken(googleToken);
      } catch (error) {
        console.error("Failed to verify token with backend:", error);
        return null;
      }
    },
    [],
  );

  // Setup Google login with Drive permissions
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        setIsLoading(true);

        // For auth-code flow, we get a code that needs to be sent to the backend
        // The backend will exchange this code for tokens
        const result = await verifyTokenWithBackend(codeResponse.code);

        if (result) {
          // Save JWT and user info to localStorage
          localStorage.setItem(TOKEN_KEY, result.token);
          localStorage.setItem(USER_KEY, JSON.stringify(result.user));

          // Update state
          setToken(result.token);
          setUser(result.user);
          
          // Set freshLogin flag to skip initial token validation
          // Also store in localStorage to persist across page loads
          setFreshLogin(true);
          localStorage.setItem('fresh_login', 'true');
          
          // Reset the freshLogin flag after 10 seconds
          setTimeout(() => {
            setFreshLogin(false);
            localStorage.removeItem('fresh_login');
          }, 10000);
          
          // Use a small timeout before navigation to ensure state is updated
          setTimeout(() => {
            navigate("/dashboard");
          }, 100);
        } else {
          throw new Error("Failed to authenticate");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Authentication failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google login failed:", errorResponse);
      setIsLoading(false);
      alert("Google sign-in failed. Please try again.");
    },
    // Use authorization_code flow to get an ID token
    flow: "auth-code",
    onNonOAuthError: (err) => {
      console.error("Non-OAuth Error:", err);
      alert("Login error: " + err.message);
    },
    scope: "email profile https://www.googleapis.com/auth/drive.file",
    prompt: "",
    ux_mode: "popup",
  });

  // Check for existing authentication on app load
  useEffect(() => {
    const checkTokenAndAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      const storedFreshLogin = localStorage.getItem('fresh_login');
      
      // Set freshLogin state from localStorage if it exists
      if (storedFreshLogin === 'true' && !freshLogin) {
        setFreshLogin(true);
      }

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          setToken(storedToken);
          setUser(parsedUser);

          // Skip validation if this is a fresh login
          // Check both state and localStorage
          if (!freshLogin && storedFreshLogin !== 'true') {
            // Check if token is expired using the API
            const isExpired = await authService
              .validateToken()
              .then((valid) => !valid);
            if (isExpired) {
              // Token expired, logout
              logout();
            }
          }
        } catch (error) {
          console.error("Error validating stored authentication:", error);
          logout();
        }
      }

      setIsLoading(false);
    };

    checkTokenAndAuth();
  }, [logout, freshLogin]);

  const value = {
    user,
    isAuthenticated: !!user,
    googleLogin,
    logout,
    isLoading,
    token,
    isTokenExpired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
