import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useManagerAssistant } from '@/contexts/ManagerAssistantContext';
import ProjectProgressBar from './ProjectProgressBar';
import { stepRegistry, getStepByIndex, canNavigateToStep } from '../config/stepRegistry';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getCurrentProject, setCurrentProject, updateProject } = useManagerAssistant();

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

  const handleStepClick = (step: number) => {
    if (projectId && project && canNavigateToStep(projectId, step, project.currentStep)) {
      updateProject(projectId, { currentStep: step });
    }
  };

  const renderCurrentStep = () => {
    if (!project) return null;

    const currentStepConfig = getStepByIndex(project.currentStep);
    
    if (!currentStepConfig) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Step Not Found</h2>
          <p className="text-muted-foreground">
            The requested step could not be found.
          </p>
        </div>
      );
    }

    const StepComponent = currentStepConfig.component;
    return <StepComponent projectId={projectId} />;
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      {project && (
        <div className="bg-card border border-border rounded-xl shadow-sm">
          <ProjectProgressBar
            currentStep={project.currentStep}
            totalSteps={stepRegistry.totalSteps}
            stepLabels={stepRegistry.stepLabels}
            onStepClick={handleStepClick}
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
