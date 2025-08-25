# Manager Assistant Steps

This directory contains all the step components for the Manager Assistant workflow. Each step is organized in its own numbered folder for easy management and extensibility.

## Structure

```
steps/
├── 01-create-project/
│   ├── CreateProject.tsx
│   └── index.ts
├── 02-sheet-input/
│   ├── SheetInput.tsx
│   └── index.ts
├── 03-review-sheet/
│   ├── ReviewSheet.tsx
│   └── index.ts
├── README.md
└── index.ts
```

## Adding a New Step

To add a new step to the workflow, follow these steps:

### 1. Create the Step Folder

Create a new folder with the naming convention `0X-step-name` where X is the step number:

```bash
mkdir src/apps/manager-assistant/steps/04-new-step
```

### 2. Create the Step Component

Create your step component file (e.g., `NewStep.tsx`):

```tsx
import React from 'react';
import { StepProps } from '../../types/steps';
import { useManagerAssistant } from '@/contexts/ManagerAssistantContext';

const NewStep: React.FC<StepProps> = ({ projectId }) => {
  const { getCurrentProject, updateProject, nextStep } = useManagerAssistant();
  
  const project = getCurrentProject(projectId);

  const handleSubmit = () => {
    // Update project data
    updateProject(projectId, {
      // your updates here
    });
    
    // Progress to next step (optional)
    nextStep(projectId);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Your step UI here */}
      <h1>New Step</h1>
      <p>Project: {project?.projectName}</p>
    </div>
  );
};

export default NewStep;
```

### 3. Create the Index File

Create an `index.ts` file in your step folder:

```tsx
export { default } from './NewStep';
```

### 4. Register the Step

Add your step to the registry in `config/stepRegistry.ts`:

```tsx
import NewStep from '../steps/04-new-step';

export const stepRegistry: StepRegistryConfig = {
  steps: [
    // ... existing steps
    {
      id: 4,
      key: 'new-step',
      title: 'New Step',
      description: 'Description of what this step does',
      component: NewStep,
      isCompleted: (projectId: string) => {
        // Logic to check if step is completed
        return false;
      },
      canNavigateTo: (projectId: string, currentStep: number) => {
        // Logic to determine if user can navigate to this step
        return currentStep >= 4;
      },
    },
  ],
  // ... rest of config
};
```

### 5. Export from Steps Index (Optional)

Add your step to `steps/index.ts`:

```tsx
export { default as NewStep } from './04-new-step';
```

## Step Component Requirements

Each step component must:

1. **Accept `StepProps`**: Your component should accept the `StepProps` interface which provides the `projectId`
2. **Handle Navigation**: Use the Manager Assistant context methods to progress between steps
3. **Maintain State**: Save any form data or step-specific data to the project context
4. **Follow UI Patterns**: Use the established design patterns and components for consistency

## Step Configuration Options

Each step in the registry supports these configuration options:

- **`id`**: Unique numeric identifier (step number)
- **`key`**: Unique string identifier (kebab-case)
- **`title`**: Display name shown in progress bar
- **`description`**: Description of the step's purpose
- **`component`**: React component for the step
- **`isCompleted`**: Function to check if step is completed
- **`canNavigateTo`**: Function to determine if navigation to this step is allowed

## Best Practices

1. **Consistent Naming**: Use numbered folders (01-, 02-, etc.) and descriptive names
2. **Self-Contained**: Each step should be independent and self-contained
3. **Error Handling**: Include proper error handling and validation
4. **Responsive Design**: Ensure steps work on mobile and desktop
5. **Accessibility**: Include proper ARIA labels and keyboard navigation
6. **Loading States**: Show loading indicators for async operations

## Available Context Methods

The Manager Assistant context provides these methods:

- `getCurrentProject(projectId)`: Get current project data
- `updateProject(projectId, updates)`: Update project data
- `nextStep(projectId)`: Progress to next step
- `prevStep(projectId)`: Go back to previous step
- `setCurrentProject(projectId)`: Set active project

## UI Components

Use these consistent UI patterns across steps:

- **Header Section**: Title, icon, and description
- **Card Layout**: Use Card component for main content
- **Gradient Buttons**: Use the established blue-to-purple gradient
- **Form Validation**: Include proper validation and error states
- **Loading States**: Use consistent loading spinners and messages

That's it! The step will automatically be included in the workflow and accessible via the progress bar navigation.
