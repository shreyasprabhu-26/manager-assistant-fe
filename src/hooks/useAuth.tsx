import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUser, type User } from '@/data/mockApps';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're in dev mode (bypass auth)
    const isDevMode = process.env.NODE_ENV === 'development';
    
    if (isDevMode) {
      // Auto-login with mock user in dev mode
      setTimeout(() => {
        setUser(mockUser);
        setIsLoading(false);
      }, 500);
    } else {
      // In production, check for existing auth session
      // This would integrate with Google SSO
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
