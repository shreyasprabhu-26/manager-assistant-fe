import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressStep {
  id: number;
  label: string;
  completed: boolean;
  current: boolean;
}

interface ProjectProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  className?: string;
  onStepClick?: (step: number) => void;
}

const ProjectProgressBar: React.FC<ProjectProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabels = ['Create Project', 'Google Sheet Input', 'Project Configuration', 'Review & Confirm', 'Review Sheet'],
  className,
  onStepClick
}) => {
  const steps: ProgressStep[] = Array.from({ length: totalSteps }, (_, index) => ({
    id: index + 1,
    label: stepLabels[index] || `Step ${index + 1}`,
    completed: index + 1 < currentStep,
    current: index + 1 === currentStep,
  }));

  return (
    <div className={cn("w-full px-4 py-6", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer",
                  step.completed
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-500 shadow-lg hover:shadow-xl"
                    : step.current
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-500 shadow-lg ring-2 ring-blue-200 dark:ring-blue-800"
                    : "bg-muted border-border text-muted-foreground hover:border-blue-300 hover:bg-muted/80 hover:shadow-md"
                )}
              >
                {step.completed ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </button>
              <button
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "mt-2 text-xs font-medium text-center max-w-[100px] cursor-pointer hover:underline transition-colors",
                  step.current || step.completed
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {step.label}
              </button>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 relative">
                <div className="h-1 bg-border rounded-full" />
                <div
                  className={cn(
                    "absolute top-0 left-0 h-1 rounded-full transition-all duration-700 ease-in-out",
                    step.completed
                      ? "w-full bg-gradient-to-r from-blue-500 to-purple-600"
                      : "w-0 bg-gradient-to-r from-blue-500 to-purple-600"
                  )}
                  style={{
                    animationDelay: step.completed ? `${index * 200}ms` : '0ms'
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgressBar;
