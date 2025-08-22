import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Settings,
  FileSpreadsheet,
  FolderOpen,
} from "lucide-react";
import { useManagerAssistant } from "@/contexts/ManagerAssistantContext";
import { StepProps } from "../../types/steps";

const ReviewConfirm: React.FC<StepProps> = ({ projectId }) => {
  const { getCurrentProject, updateProject, nextStep, prevStep } = useManagerAssistant();
  const { toast } = useToast();

  const project = getCurrentProject(projectId);
  const [destinationUrl, setDestinationUrl] = useState(
    "https://drive.google.com/drive/folders/..."
  );
  const [isValidating, setIsValidating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock sheet data based on project configuration
  const mockSheetData = {
    fileName: "IIFL Samasta-DAF_internal",
    sheetName: "scope",
  };

  const handleValidate = async () => {
    setIsValidating(true);
    
    // Simulate validation
    setTimeout(() => {
      setIsValidating(false);
      toast({
        title: "✅ Destination Validated",
        description: "Google Drive location is accessible and ready.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    }, 1500);
  };

  const handleEditDetails = () => {
    // Go back to first step to edit project details
    updateProject(projectId, { currentStep: 1 });
  };

  const handleGenerateDependencies = async () => {
    setIsGenerating(true);
    
    toast({
      title: "🔄 Generating Dependencies",
      description: "Creating task dependencies and relationships...",
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });

    // Simulate dependency generation
    setTimeout(() => {
      setIsGenerating(false);
      
      toast({
        title: "✅ Dependencies Generated",
        description: "Task dependencies have been successfully generated.",
        className: "bg-green-50 border-green-200 text-green-800",
      });

      // Progress to next step (Review Sheet)
      nextStep(projectId);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Review & Confirm
        </h1>
        <p className="text-muted-foreground">
          Please review your project details before we generate dependencies
        </p>
      </div>

      <Card className="border-border shadow-lg">
        {/* Project Name Header */}
        {project?.projectName && (
          <div className="bg-blue-50 dark:bg-blue-950/20 border-b border-blue-200 dark:border-blue-800 px-6 py-3">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 text-center">
              {project.projectName}
            </h3>
          </div>
        )}

        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CardTitle className="text-xl font-semibold">
              Review & Confirm
            </CardTitle>
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </div>
          <CardDescription className="text-sm">
            Please review your project details before we generate dependencies
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Project Details Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-sm">Project Details</h3>
              <Badge variant="secondary" className="text-xs">Required</Badge>
            </div>
            
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Name:</p>
                  <p className="text-sm font-medium">{project?.projectName || "test"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Description:</p>
                  <p className="text-sm">{project?.description || ""}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Document Source Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-sm">Document Source</h3>
              <Badge variant="secondary" className="text-xs">Required</Badge>
            </div>
            
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">File Name:</p>
                  <p className="text-sm font-medium">{mockSheetData.fileName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sheet:</p>
                  <p className="text-sm font-medium">{mockSheetData.sheetName}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Project Configuration Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold text-sm">Project Configuration</h3>
              <Badge variant="secondary" className="text-xs">Required</Badge>
            </div>
            
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Methodology:</p>
                  <Badge 
                    variant="outline" 
                    className="bg-blue-100 text-blue-800 border-blue-300"
                  >
                    {project?.methodology || "Waterfall"}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Issue Type:</p>
                  <Badge 
                    variant="outline" 
                    className="bg-green-100 text-green-800 border-green-300"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    {project?.issue_type || "User Story"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Destination Location Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FolderOpen className="w-4 h-4 text-orange-600" />
              <h3 className="font-semibold text-sm">Destination Location</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="flex-1"
                />
                <Button
                  onClick={handleValidate}
                  disabled={isValidating}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {isValidating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Validating...
                    </>
                  ) : (
                    "Validate"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This is the Google Drive location where the generated spreadsheet will be saved.
              </p>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleEditDetails}
              variant="outline"
              className="flex-1 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Edit Details
            </Button>
            <Button
              onClick={handleGenerateDependencies}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Dependencies...
                </>
              ) : (
                <>
                  Generate Dependencies
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewConfirm;
