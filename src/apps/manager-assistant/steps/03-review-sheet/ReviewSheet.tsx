import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CheckCircle,
  Download,
  Eye,
  Share2,
  Sparkles,
} from "lucide-react";
import { useManagerAssistant } from "@/contexts/ManagerAssistantContext";
import { StepProps } from "../../types/steps";

const ReviewSheet: React.FC<StepProps> = ({ projectId }) => {
  const { getCurrentProject } = useManagerAssistant();
  
  const project = getCurrentProject(projectId);

  const handleDownload = () => {
    // Implement download functionality
    console.log("Download sheet for project:", projectId);
  };

  const handlePreview = () => {
    // Implement preview functionality
    console.log("Preview sheet for project:", projectId);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Share sheet for project:", projectId);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Review Sheet
        </h1>
        <p className="text-muted-foreground">
          Review and finalize your generated tasks
        </p>
      </div>

      {/* Review Section */}
      <Card className="border-border shadow-lg card-gradient">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
            Document Review
            <Sparkles className="h-5 w-5 text-green-500" />
            {project?.projectName && (
              <span className="text-sm font-normal text-muted-foreground">
                for <span className="font-semibold text-green-600">{project.projectName}</span>
              </span>
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your project tasks have been generated successfully
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Project Summary */}
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-medium text-green-800 dark:text-green-200">
                Processing Complete
              </h3>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Successfully generated tasks for your project. Review the details below.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-xs text-muted-foreground">Tasks Generated</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-xs text-muted-foreground">Dependencies</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-xs text-muted-foreground">Milestones</div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ✅ Structure Validated
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              📊 Tasks Organized
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              🔗 Dependencies Mapped
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              📅 Timeline Created
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <Button
              onClick={handlePreview}
              variant="outline"
              className="flex items-center gap-2 h-12"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2 h-12"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              onClick={handleShare}
              className="flex items-center gap-2 h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Final Action */}
          <div className="pt-4 border-t border-border">
            <Button
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 h-12 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Complete Project Setup</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSheet;
