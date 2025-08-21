import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ListTodo, HelpCircle } from "lucide-react";

interface SubtaskToggleProps {
  isSubtaskNeeded: boolean;
  onToggle: () => void;
}

const SubtaskToggle: React.FC<SubtaskToggleProps> = ({ isSubtaskNeeded, onToggle }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <ListTodo className="w-4 h-4 text-purple-600" />
        <Label className="text-gray-900 font-semibold text-sm">
          Subtask Configuration
        </Label>
        <HelpCircle className="w-3 h-3 text-gray-400" />
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <Label htmlFor="subtask-toggle" className="text-sm font-medium text-gray-900">
              Enable Subtasks
            </Label>
            <Badge 
              variant={isSubtaskNeeded ? "default" : "secondary"} 
              className={`text-xs ${isSubtaskNeeded ? "bg-green-100 text-green-800" : ""}`}
            >
              {isSubtaskNeeded ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <p className="text-xs text-gray-600">
            Is similar Subtask needed (like UI Integration, Mobile Responsiveness etc.) under every Story/Task
          </p>
        </div>
        <Switch
          id="subtask-toggle"
          checked={isSubtaskNeeded}
          onCheckedChange={onToggle}
          className="ml-3"
        />
      </div>
    </div>
  );
};

export default SubtaskToggle;
