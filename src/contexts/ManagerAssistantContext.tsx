import React, { createContext, useContext, useState, ReactNode } from 'react';
import { stepRegistry } from '@/apps/manager-assistant/config/stepRegistry';

export interface ProjectData {
  projectId: string;
  projectName: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ManagerAssistantContextType {
  projects: Record<string, ProjectData>;
  currentProject: ProjectData | null;
  createProject: (projectName: string, description: string) => string;
  updateProject: (projectId: string, updates: Partial<ProjectData>) => void;
  setCurrentProject: (projectId: string) => void;
  getCurrentProject: (projectId: string) => ProjectData | null;
  nextStep: (projectId: string) => void;
  prevStep: (projectId: string) => void;
}

const ManagerAssistantContext = createContext<ManagerAssistantContextType | undefined>(undefined);

export const useManagerAssistant = () => {
  const context = useContext(ManagerAssistantContext);
  if (!context) {
    throw new Error('useManagerAssistant must be used within a ManagerAssistantProvider');
  }
  return context;
};

interface ManagerAssistantProviderProps {
  children: ReactNode;
}

export const ManagerAssistantProvider: React.FC<ManagerAssistantProviderProps> = ({ children }) => {
  // Initialize with mock project data
  const [projects, setProjects] = useState<Record<string, ProjectData>>({
    '1': {
      projectId: '1',
      projectName: 'test',
      description: 'Test project for task generation with waterfall methodology',
      currentStep: 2,
      totalSteps: 3,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      updatedAt: new Date(),
    }
  });
  const [currentProject, setCurrentProjectState] = useState<ProjectData | null>(null);

  const createProject = (projectName: string, description: string): string => {
    const projectId = Date.now().toString(); // Simple ID generation
    const newProject: ProjectData = {
      projectId,
      projectName,
      description,
      currentStep: 1,
      totalSteps: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects(prev => ({
      ...prev,
      [projectId]: newProject
    }));

    return projectId;
  };

  const updateProject = (projectId: string, updates: Partial<ProjectData>) => {
    setProjects(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        ...updates,
        updatedAt: new Date(),
      }
    }));

    // Update current project if it's the one being updated
    if (currentProject?.projectId === projectId) {
      setCurrentProjectState(prev => prev ? {
        ...prev,
        ...updates,
        updatedAt: new Date(),
      } : null);
    }
  };

  const setCurrentProject = (projectId: string) => {
    const project = projects[projectId];
    if (project) {
      setCurrentProjectState(project);
    }
  };

  const getCurrentProject = (projectId: string): ProjectData | null => {
    return projects[projectId] || null;
  };

  const nextStep = (projectId: string) => {
    const project = projects[projectId];
    if (project && project.currentStep < project.totalSteps) {
      updateProject(projectId, { currentStep: project.currentStep + 1 });
    }
  };

  const prevStep = (projectId: string) => {
    const project = projects[projectId];
    if (project && project.currentStep > 1) {
      updateProject(projectId, { currentStep: project.currentStep - 1 });
    }
  };

  const value: ManagerAssistantContextType = {
    projects,
    currentProject,
    createProject,
    updateProject,
    setCurrentProject,
    getCurrentProject,
    nextStep,
    prevStep,
  };

  return (
    <ManagerAssistantContext.Provider value={value}>
      {children}
    </ManagerAssistantContext.Provider>
  );
};
