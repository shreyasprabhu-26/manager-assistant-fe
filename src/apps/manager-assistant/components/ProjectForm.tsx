import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit3, Sparkles } from 'lucide-react';
import { useManagerAssistant } from '@/contexts/ManagerAssistantContext';

interface ProjectFormProps {
  projectId?: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const { createProject, getCurrentProject, updateProject, nextStep } = useManagerAssistant();

  const existingProject = projectId ? getCurrentProject(projectId) : null;

  const [projectName, setProjectName] = useState(existingProject?.projectName || '');
  const [description, setDescription] = useState(existingProject?.description || '');
  const [charCount, setCharCount] = useState(existingProject?.description?.length || 0);

  const maxChars = 160;
  // Consider it editing only if the project has a name already saved
  const isEditing = !!(existingProject && existingProject.projectName);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setDescription(value);
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim()) {
      return;
    }

    if (isEditing && projectId) {
      updateProject(projectId, {
        projectName: projectName.trim(),
        description: description.trim(),
      });
      // Just update, don't progress step
    } else if (projectId) {
      // This is completing the creation step
      updateProject(projectId, {
        projectName: projectName.trim(),
        description: description.trim(),
      });
      // Progress to next step
      nextStep(projectId);
    } else {
      // This shouldn't happen, but fallback
      const newProjectId = createProject(projectName.trim(), description.trim());
      navigate(`/manager-assist/${newProjectId}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <PlusCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Create New Project
        </h1>
        <p className="text-muted-foreground">
          Manage and track your project progress
        </p>
      </div>

      {/* Form Section */}
      <Card className="border-border shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Edit3 className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
            Project Information
            <Sparkles className="h-5 w-5 text-blue-500" />
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your project details to get started
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name Field */}
            <div className="space-y-2">
              <Label htmlFor="projectName" className="text-sm font-medium">
                Project Name
              </Label>
              <Input
                id="projectName"
                type="text"
                placeholder="Enter your project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Project Description Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="description" className="text-sm font-medium">
                  Project Description
                </Label>
                <span className="text-xs text-muted-foreground">
                  {charCount}/{maxChars}
                </span>
              </div>
              <Textarea
                id="description"
                placeholder="Briefly describe your project (optional)"
                value={description}
                onChange={handleDescriptionChange}
                className="w-full min-h-[100px] resize-none"
                maxLength={maxChars}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
                disabled={!projectName.trim()}
              >
                <Sparkles className="h-4 w-4" />
                Let's Get Started
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectForm;
