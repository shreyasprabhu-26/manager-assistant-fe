import { ComponentType } from 'react';

export interface StepProps {
  projectId: string;
}

export interface StepConfig {
  id: number;
  key: string;
  title: string;
  description: string;
  component: ComponentType<StepProps>;
  isCompleted?: (projectId: string) => boolean;
  canNavigateTo?: (projectId: string, currentStep: number) => boolean;
}

export interface StepRegistryConfig {
  steps: StepConfig[];
  totalSteps: number;
  stepLabels: string[];
}
