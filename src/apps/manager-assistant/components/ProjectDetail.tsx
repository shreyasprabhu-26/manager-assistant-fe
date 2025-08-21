import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useManagerAssistant } from '@/contexts/ManagerAssistantContext';
import ProjectProgressBar from './ProjectProgressBar';
import ProjectForm from './ProjectForm';
import GoogleSheetInput from './GoogleSheetInput';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getCurrentProject, setCurrentProject } = useManagerAssistant();

  const project = projectId ? getCurrentProject(projectId) : null;

  useEffect(() => {
    if (projectId && project) {
      setCurrentProject(projectId);
    }
  }, [projectId, project, setCurrentProject]);

  // If project doesn't exist, redirect to manager-assist
  if (projectId && !project) {
    return <Navigate to="/manager-assist" replace />;
  }

  if (!projectId) {
    return <Navigate to="/manager-assist" replace />;
  }

  const renderCurrentStep = () => {
    if (!project) return null;

    switch (project.currentStep) {
      case 1:
        return <ProjectForm projectId={projectId} />;
      case 2:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Google Sheet Input</h2>
            <p className="text-muted-foreground">This step is coming soon...</p>
          </div>
        );
      case 3:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Review Sheet</h2>
            <p className="text-muted-foreground">This step is coming soon...</p>
          </div>
        );
      default:
        return <ProjectForm projectId={projectId} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      {project && (
        <div className="bg-card border border-border rounded-xl shadow-sm">
          <ProjectProgressBar
            currentStep={project.currentStep}
            totalSteps={project.totalSteps}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="w-full">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default ProjectDetail;
