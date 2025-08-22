import "./global.css";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Providers
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { ManagerAssistantProvider } from "@/contexts/ManagerAssistantContext";

// Components
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManagerAssist from "./apps/manager-assistant/ManagerAssist";
import ProjectDetail from "./apps/manager-assistant/components/ProjectDetail";
import SowToHld from "./apps/SowToHld";
import QaTestCase from "./apps/qa-test-case/QaTestCase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="manager-assistant-theme">
      <AuthProvider>
        <ManagerAssistantProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager-assist"
                  element={
                    <ProtectedRoute>
                      <ManagerAssist />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager-assist/:projectId"
                  element={
                    <ProtectedRoute>
                      <ProjectDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sow-to-hld"
                  element={
                    <ProtectedRoute>
                      <SowToHld />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/qa-test-case"
                  element={
                    <ProtectedRoute>
                      <QaTestCase />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ManagerAssistantProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
