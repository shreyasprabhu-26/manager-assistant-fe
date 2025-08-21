import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Settings,
  Sparkles,
  ListTodo,
  GitBranch,
  Zap,
  CheckSquare,
  BookOpen,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SubtaskToggle from "../../components/ui/SubtaskToggle";
import SubtaskEntryModal from "../../components/ui/SubtaskEntryModal";
import FinishButton from "../../components/ui/FinishButton";
import { useManagerAssistant } from "@/contexts/ManagerAssistantContext";
import { StepProps } from "../../types/steps";

type MethodologyType = "waterfall" | "agile";
type IssueType = "story" | "task";

const ProjectConfiguration: React.FC<StepProps> = ({ projectId }) => {
  const { getCurrentProject, updateProject, nextStep } = useManagerAssistant();
  const { toast } = useToast();

  const project = getCurrentProject(projectId);

  const [methodology, setMethodology] = useState<MethodologyType>(
    project?.methodology || "waterfall"
  );
  const [issueType, setIssueType] = useState<IssueType>(
    project?.issue_type || "story"
  );
  const [isSubtaskNeeded, setIsSubtaskNeeded] = useState(
    Boolean(project?.subtask_list && project.subtask_list.length > 0)
  );
  const [subtasks, setSubtasks] = useState<string[]>(
    project?.subtask_list || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize local state from project when component mounts
  useEffect(() => {
    if (project) {
      setMethodology(project.methodology || "waterfall");
      setIssueType(project.issue_type || "story");
      setIsSubtaskNeeded(Boolean(project.subtask_list && project.subtask_list.length > 0));
      setSubtasks(project.subtask_list || []);
    }
  }, [project]);

  const handleToggleSubtask = () => {
    const newValue = !isSubtaskNeeded;
    setIsSubtaskNeeded(newValue);

    // If toggling to true and no subtasks exist, open the modal
    if (newValue && subtasks.length === 0) {
      // Small delay for better UX - toggle animates first, then modal opens
      setTimeout(() => setIsModalOpen(true), 100);
    }
  };

  // Handle subtasks from modal
  const handleSubtasksFinished = (newSubtasks: string[]) => {
    setSubtasks(newSubtasks);

    // Show success toast when subtasks are added
    if (newSubtasks.length > 0) {
      toast({
        title: `✅ ${newSubtasks.length} Subtask${newSubtasks.length > 1 ? "s" : ""} Added`,
        description: "Subtasks have been configured successfully",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    }
  };

  const handleFinish = async () => {
    // Update project with configuration data
    updateProject(projectId, {
      methodology,
      issue_type: issueType,
      subtask_list: isSubtaskNeeded ? subtasks : [],
    });

    // Show success message
    toast({
      title: "✅ Configuration Saved",
      description: "Project configuration has been saved successfully",
      className: "bg-green-50 border-green-200 text-green-800",
    });

    // Progress to next step
    nextStep(projectId);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <Settings className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Project Configuration
        </h1>
        <p className="text-muted-foreground">
          Configure your project methodology and issue tracking preferences
        </p>
      </div>

      <Card className="border-border shadow-lg card-gradient">
        <CardHeader className="text-center pb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          {/* Project details from previous step */}
          {project?.projectName && (
            <div className="mb-3 bg-blue-100/70 dark:bg-blue-900/30 rounded-lg px-3 py-2 border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-blue-900 dark:text-blue-100">
                {project.projectName}
              </h3>
              {project.description && (
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  {project.description}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CardTitle className="text-xl font-semibold">
              Project Configuration
            </CardTitle>
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </div>
          <CardDescription className="text-sm">
            Configure your project methodology and issue tracking preferences
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Methodology Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-blue-600" />
              <Label className="font-semibold text-sm">
                Project Methodology
              </Label>
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">
              Choose the development methodology for your project workflow
            </p>

            <RadioGroup
              value={methodology}
              onValueChange={(value: MethodologyType) => setMethodology(value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-sm ${
                  methodology === "waterfall"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-sm"
                    : "border-border hover:border-blue-300"
                }`}
                onClick={() => setMethodology("waterfall")}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem
                    value="waterfall"
                    id="waterfall"
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="waterfall"
                      className="font-medium cursor-pointer text-sm"
                    >
                      Waterfall
                    </Label>
                    <p className="text-muted-foreground text-xs mt-1">
                      Sequential phases with clear milestones
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-sm ${
                  methodology === "agile"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-sm"
                    : "border-border hover:border-blue-300"
                }`}
                onClick={() => setMethodology("agile")}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="agile" id="agile" className="mt-0.5" />
                  <div className="flex-1">
                    <Label
                      htmlFor="agile"
                      className="font-medium cursor-pointer text-sm flex items-center space-x-1"
                    >
                      <span>Agile</span>
                      <Zap className="w-3 h-3 text-orange-500" />
                    </Label>
                    <p className="text-muted-foreground text-xs mt-1">
                      Iterative development with sprint cycles
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Issue Type Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-green-600" />
              <Label className="font-semibold text-sm">
                Primary Issue Type
              </Label>
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">
              Select the main type of work items for project tracking
            </p>

            <RadioGroup
              value={issueType}
              onValueChange={(value: IssueType) => setIssueType(value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-sm ${
                  issueType === "story"
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20 shadow-sm"
                    : "border-border hover:border-green-300"
                }`}
                onClick={() => setIssueType("story")}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="story" id="story" className="mt-0.5" />
                  <div className="flex-1">
                    <Label
                      htmlFor="story"
                      className="font-medium cursor-pointer text-sm flex items-center space-x-1"
                    >
                      <BookOpen className="w-3 h-3 text-blue-500" />
                      <span>User Story</span>
                    </Label>
                    <p className="text-muted-foreground text-xs mt-1">
                      Feature-focused work from user perspective
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-sm ${
                  issueType === "task"
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20 shadow-sm"
                    : "border-border hover:border-green-300"
                }`}
                onClick={() => setIssueType("task")}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="task" id="task" className="mt-0.5" />
                  <div className="flex-1">
                    <Label
                      htmlFor="task"
                      className="font-medium cursor-pointer text-sm flex items-center space-x-1"
                    >
                      <CheckSquare className="w-3 h-3 text-purple-500" />
                      <span>Task</span>
                    </Label>
                    <p className="text-muted-foreground text-xs mt-1">
                      Technical work items and implementation
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Subtask Toggle */}
          <SubtaskToggle
            isSubtaskNeeded={isSubtaskNeeded}
            onToggle={handleToggleSubtask}
          />

          {/* Show subtasks summary if enabled and subtasks exist */}
          {isSubtaskNeeded && subtasks.length > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ListTodo className="w-4 h-4 text-purple-600" />
                  <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    Configured Subtasks
                  </h4>
                </div>
                <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-xs">
                  {subtasks.length}
                </Badge>
              </div>

              <div className="space-y-2 max-h-32 overflow-y-auto">
                {subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="text-xs flex items-center py-1 border-b border-purple-200 dark:border-purple-700 last:border-0"
                  >
                    <span className="w-5 text-right text-purple-700 dark:text-purple-300 font-medium mr-2">
                      {index + 1}.
                    </span>
                    <span className="text-purple-800 dark:text-purple-200">{subtask}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-purple-200 dark:border-purple-700">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 font-medium"
                >
                  Edit Subtasks
                </button>
              </div>
            </div>
          )}

          {/* Finish Button */}
          <div className="pt-4">
            <FinishButton onClick={handleFinish} />
          </div>
        </CardContent>
      </Card>

      {/* Subtask Entry Modal */}
      <SubtaskEntryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onFinish={handleSubtasksFinished}
        initialSubtasks={subtasks}
      />
    </div>
  );
};

export default ProjectConfiguration;
