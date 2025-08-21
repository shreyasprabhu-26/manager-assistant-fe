import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "./Layout";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading, isTokenExpired, logout } = useAuth();
  const navigate = useNavigate();

  // Check for token expiration only on initial component mount, not on every route change
  useEffect(() => {
    // Skip the check if we're still loading
    if (isLoading) return;

    // We only want to check token expiration on mount
    const checkTokenExpiration = async () => {
      try {
        const expired = await isTokenExpired();
        if (expired) {
          logout();
        }
      } catch (error) {
        console.error("Error checking token expiration:", error);
      }
    };

    checkTokenExpiration();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
}
