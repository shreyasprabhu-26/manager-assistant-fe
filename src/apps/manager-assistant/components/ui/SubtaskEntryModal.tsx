import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save } from "lucide-react";

interface SubtaskEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFinish: (subtasks: string[]) => void;
  initialSubtasks?: string[];
}

const SubtaskEntryModal: React.FC<SubtaskEntryModalProps> = ({
  open,
  onOpenChange,
  onFinish,
  initialSubtasks = []
}) => {
  const [subtasks, setSubtasks] = useState<string[]>(initialSubtasks);
  const [newSubtask, setNewSubtask] = useState("");

  useEffect(() => {
    if (open) {
      setSubtasks(initialSubtasks);
      setNewSubtask("");
    }
  }, [open, initialSubtasks]);

  const addSubtask = () => {
    if (newSubtask.trim() && !subtasks.includes(newSubtask.trim())) {
      setSubtasks([...subtasks, newSubtask.trim()]);
      setNewSubtask("");
    }
  };

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleFinish = () => {
    onFinish(subtasks);
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSubtask();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-600" />
            Configure Subtasks
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subtask-input" className="text-sm font-medium">
              Add Subtask
            </Label>
            <div className="flex gap-2">
              <Input
                id="subtask-input"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., UI Integration, Mobile Responsiveness"
                className="flex-1"
              />
              <Button
                onClick={addSubtask}
                disabled={!newSubtask.trim()}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {subtasks.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Current Subtasks</Label>
                <Badge variant="secondary" className="text-xs">
                  {subtasks.length}
                </Badge>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-100"
                  >
                    <span className="text-sm text-purple-900 flex-1">{subtask}</span>
                    <Button
                      onClick={() => removeSubtask(index)}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-purple-600 hover:text-purple-800"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleFinish}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Subtasks
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubtaskEntryModal;
