import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Plus, LayoutGrid, List, Filter, Sparkles, Clock, ChevronRight } from 'lucide-react';

export default function ManagerAssist() {
  // Mock project data
  const projects = [
    {
      id: 1,
      name: 'test',
      type: 'task',
      method: 'waterfall',
      currentState: 'task_generation',
      subtasks: 1,
      generatedSheets: 1,
      isActive: true
    },
    // Add more mock projects if needed
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 min-h-[calc(100vh-80px)] flex flex-col">
      {/* Header Section */}
      <div className="relative border border-border rounded-xl shadow-sm bg-card">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 rounded-xl -z-10"></div>
        <div className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome to Manager Assistance
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage and track your project progress
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 justify-between border border-border rounded-xl p-4 shadow-sm bg-card">
        <div className="relative w-full sm:w-auto sm:min-w-[300px] flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10 w-full" 
          />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center space-x-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          <Button className="bg-primary text-primary-foreground flex items-center space-x-1 ml-2">
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <div className="border border-border rounded-xl p-6 shadow-sm bg-background/50 dark:bg-slate-900/50 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="border-2 border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all w-full min-w-[320px]">
            <div className="p-5">
              {/* Project Name and Active Status */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{project.name}</h3>
                {project.isActive && (
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs text-green-600 dark:text-green-400">Active</span>
                  </div>
                )}
              </div>
              
              {/* Project Details */}
              <div className="space-y-2.5 border border-border rounded-lg p-3 bg-card/50 dark:bg-slate-800/50">
                <div className="flex items-center border-b border-border pb-1.5">
                  <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Type: </span>
                  <span className="text-sm font-medium ml-1">{project.type}</span>
                </div>
                
                <div className="flex items-center border-b border-border pb-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Method: </span>
                  <span className="text-sm font-medium ml-1">{project.method}</span>
                </div>
                
                <div className="flex items-center border-b border-border pb-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Current Stage: </span>
                  <span className="text-sm font-medium ml-1">{project.currentState.replace('_', ' ')}</span>
                </div>
                
                <div className="flex items-center border-b border-border pb-1.5">
                  <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Subtasks: </span>
                  <Badge variant="secondary" className="ml-1">{project.subtasks}</Badge>
                </div>
                
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Generated Sheets: </span>
                  <span className="text-sm ml-1">({project.generatedSheets})</span>
                </div>
              </div>
              
              {/* Separator */}
              <div className="border-t my-3 border-border"></div>
              
              {/* Task Report Button */}
              <div className="mb-3 border-b border-border pb-2">
                <Button variant="link" className="text-blue-600 dark:text-blue-400 p-0 text-sm">
                  Task Report
                </Button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between items-center border border-border rounded-lg p-2 bg-muted/50 dark:bg-slate-800/70">
                <Button variant="outline" size="sm" className="text-blue-600 dark:text-blue-400 flex items-center gap-1 border-blue-200 dark:border-blue-800">
                  <Sparkles className="h-3 w-3" />
                  <span>Task Generation</span>
                </Button>
                
                <Button variant="secondary" size="sm" className="flex items-center gap-1">
                  <span>Details</span>
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        </div>
      </div>
    </div>
  );
}
