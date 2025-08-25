import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import { useManagerAssistant } from "@/contexts/ManagerAssistantContext";
import { StepProps } from "../../types/steps";

const SheetInput: React.FC<StepProps> = ({ projectId }) => {
  const { getCurrentProject, updateProject, nextStep } = useManagerAssistant();
  const { toast } = useToast();
  
  const project = getCurrentProject(projectId);
  
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  const [selectedSheet, setSelectedSheet] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock sheets data for demonstration
  const mockSheets = [
    { id: "sheet1", name: "Project Requirements" },
    { id: "sheet2", name: "Task List" },
    { id: "sheet3", name: "Resource Planning" }
  ];

  const isValidSpreadsheetUrl = (url: string) => {
    return url.includes("docs.google.com/spreadsheets") && url.length > 30;
  };

  const canValidate = useMemo(
    () => isValidSpreadsheetUrl(spreadsheetUrl),
    [spreadsheetUrl],
  );

  const validateSpreadsheet = async () => {
    setError(null);
    setIsChecking(true);

    if (!canValidate) {
      setError("Invalid spreadsheet URL.");
      setIsChecking(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsValidated(true);
      setIsChecking(false);
      toast({
        title: "✅ Spreadsheet Validated",
        description: "Sheet structure verified successfully.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canValidate || !selectedSheet) {
      toast({
        title: "Form Incomplete",
        description: "Please validate and select a sheet.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      toast({
        title: "✅ Processing Complete",
        description: "Loading project configuration...",
        className: "bg-green-50 border-green-200 text-green-800",
      });

      setTimeout(() => {
        // Update project with sheet info
        updateProject(projectId, {
          // Add sheet data to project (extend interface as needed)
        });
        
        // Progress to next step
        nextStep(projectId);
        setIsSubmitting(false);
      }, 2000);
    } catch {
      toast({
        title: "Unexpected Error",
        description: "Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Google Sheet Input
        </h1>
        <p className="text-muted-foreground">
          Submit a Scope Sheet Link to Generate Tasks
        </p>
      </div>

      {/* Form Section */}
      <Card className="border-border shadow-lg card-gradient">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
            Document Processing
            <Sparkles className="h-5 w-5 text-blue-500" />
            {project?.projectName && (
              <span className="text-sm font-normal text-muted-foreground">
                for <span className="font-semibold text-blue-600">{project.projectName}</span>
              </span>
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Submit a Scope Sheet Link to Generate Task
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Info Card */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Don't have a spreadsheet for document processing? Use Scope AI to generate one.
              </p>
              <Button
                type="button"
                variant="outline"
                className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 text-xs font-semibold px-4 py-2 whitespace-nowrap"
                onClick={() => window.open("https://scopeai.niveussolutions.com/app/scope/login", "_blank")}
              >
                Scope AI →
              </Button>
            </div>

            {/* Spreadsheet Link Input */}
            <div className="space-y-3">
              <Label htmlFor="spreadsheet-url" className="text-sm font-medium">
                Scope Sheet Link
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Input
                    id="spreadsheet-url"
                    type="url"
                    value={spreadsheetUrl}
                    onChange={(e) => {
                      setSpreadsheetUrl(e.target.value);
                      setIsValidated(false);
                      setError(null);
                    }}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className={`w-full h-12 pr-10 transition-all duration-200 ${
                      spreadsheetUrl.length > 10
                        ? isValidSpreadsheetUrl(spreadsheetUrl)
                          ? "border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                          : "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                    disabled={isSubmitting || isChecking}
                  />
                  <div className="absolute right-3 top-3.5">
                    {spreadsheetUrl.length > 10 ? (
                      isValidSpreadsheetUrl(spreadsheetUrl) ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )
                    ) : (
                      <FileSpreadsheet className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={validateSpreadsheet}
                  disabled={!canValidate || isChecking}
                  className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 whitespace-nowrap"
                  aria-busy={isChecking}
                >
                  {isChecking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Checking...
                    </>
                  ) : (
                    "Validate"
                  )}
                </Button>
              </div>
              {error && (
                <div className="text-red-600 text-sm flex items-center gap-2 mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>

            {/* Sheet Selection */}
            {isValidated && (
              <div className="pt-4">
                <Label className="text-sm font-medium block mb-3">
                  Select a Sheet
                </Label>
                <div className="flex flex-wrap gap-2">
                  {mockSheets.map((sheet) => (
                    <Button
                      key={sheet.id}
                      type="button"
                      onClick={() => setSelectedSheet(sheet)}
                      variant={selectedSheet?.id === sheet.id ? "default" : "outline"}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        selectedSheet?.id === sheet.id
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                          : "hover:bg-muted"
                      }`}
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span className="truncate max-w-[150px]">{sheet.name}</span>
                      {selectedSheet?.id === sheet.id && (
                        <CheckCircle className="w-3.5 h-3.5 ml-1" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !isValidated || !selectedSheet}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:bg-gray-400 disabled:opacity-50 text-white font-semibold py-3 h-12 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Process Document</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SheetInput;
