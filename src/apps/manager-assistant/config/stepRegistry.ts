import { StepRegistryConfig } from '../types/steps';

// Import all step components
import CreateProject from '../steps/01-create-project';
import SheetInput from '../steps/02-sheet-input';
import ProjectConfiguration from '../steps/04-project-configuration';
import ReviewConfirm from '../steps/04-review-confirm';
import ReviewSheet from '../steps/03-review-sheet';

/**
 * Step Registry Configuration
 * 
 * To add a new step:
 * 1. Create a new folder in `/steps/` with naming convention: `0X-step-name`
 * 2. Create your step component implementing the StepProps interface
 * 3. Add the step configuration to this registry
 * 4. The system will automatically handle routing and navigation
 */
export const stepRegistry: StepRegistryConfig = {
  steps: [
    {
      id: 1,
      key: 'create-project',
      title: 'Create Project',
      description: 'Set up your project details and information',
      component: CreateProject,
      isCompleted: (projectId: string) => {
        // Add logic to check if step is completed
        return false;
      },
      canNavigateTo: (projectId: string, currentStep: number) => {
        // Always allow navigation to first step
        return true;
      },
    },
    {
      id: 2,
      key: 'sheet-input',
      title: 'Google Sheet Input',
      description: 'Upload and configure your spreadsheet data',
      component: SheetInput,
      isCompleted: (projectId: string) => {
        // Add logic to check if step is completed
        return false;
      },
      canNavigateTo: (projectId: string, currentStep: number) => {
        // Allow navigation if previous steps are completed or if already on/past this step
        return currentStep >= 2;
      },
    },
    {
      id: 3,
      key: 'project-configuration',
      title: 'Project Configuration',
      description: 'Configure your project methodology and issue tracking preferences',
      component: ProjectConfiguration,
      isCompleted: (projectId: string) => {
        // Add logic to check if step is completed
        return false;
      },
      canNavigateTo: (projectId: string, currentStep: number) => {
        // Allow navigation if previous steps are completed or if already on/past this step
        return currentStep >= 3;
      },
    },
    {
      id: 4,
      key: 'review-confirm',
      title: 'Review & Confirm',
      description: 'Review your project details before generating dependencies',
      component: ReviewConfirm,
      isCompleted: (projectId: string) => {
        // Add logic to check if step is completed
        return false;
      },
      canNavigateTo: (projectId: string, currentStep: number) => {
        // Allow navigation if previous steps are completed or if already on/past this step
        return currentStep >= 4;
      },
    },
    {
      id: 5,
      key: 'review-sheet',
      title: 'Review Sheet',
      description: 'Review and finalize your generated tasks',
      component: ReviewSheet,
      isCompleted: (projectId: string) => {
        // Add logic to check if step is completed
        return false;
      },
      canNavigateTo: (projectId: string, currentStep: number) => {
        // Allow navigation if previous steps are completed or if already on/past this step
        return currentStep >= 5;
      },
    },
  ],
  get totalSteps() {
    return this.steps.length;
  },
  get stepLabels() {
    return this.steps.map(step => step.title);
  },
};

/**
 * Helper functions for working with steps
 */
export const getStepByIndex = (index: number) => {
  return stepRegistry.steps.find(step => step.id === index);
};

export const getStepByKey = (key: string) => {
  return stepRegistry.steps.find(step => step.key === key);
};

export const getNextStep = (currentStep: number) => {
  return stepRegistry.steps.find(step => step.id === currentStep + 1);
};

export const getPreviousStep = (currentStep: number) => {
  return stepRegistry.steps.find(step => step.id === currentStep - 1);
};

export const canNavigateToStep = (projectId: string, targetStep: number, currentStep: number) => {
  const step = getStepByIndex(targetStep);
  return step?.canNavigateTo?.(projectId, currentStep) ?? false;
};
