import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ManagerAssist() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl -z-10"></div>
        <div className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Manager Assist
            </h1>
          </div>
          <p className="text-muted-foreground">
            Process project scope sheets and generate tasks, dependencies, and task serialization
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="border-border/50 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 card-gradient">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg text-green-800 dark:text-green-300">1. Upload Project Details</CardTitle>
            </div>
            <CardDescription>
              Provide project information and scope sheet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drop your Excel file here or click to upload
              </p>
            </div>
            <Button className="w-full" disabled>
              Select Scope Sheet
            </Button>
          </CardContent>
        </Card>

        {/* Processing Steps */}
        <Card className="border-border/50 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 card-gradient">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg text-blue-800 dark:text-blue-300">2. Processing Steps</CardTitle>
            </div>
            <CardDescription>
              Automated task generation and serialization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-white/50 dark:bg-background/50">
              <span className="text-sm font-medium">Task Generation</span>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300">
                Pending
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-white/50 dark:bg-background/50">
              <span className="text-sm font-medium">Dependency Generation</span>
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/20 dark:text-orange-300">
                Pending
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-white/50 dark:bg-background/50">
              <span className="text-sm font-medium">Task Serialization</span>
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-300">
                Pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="border-border/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 card-gradient">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
                <Download className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg text-purple-800 dark:text-purple-300">3. Download Results</CardTitle>
            </div>
            <CardDescription>
              Generated tasks and execution plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full" disabled>
                Download Tasks Excel
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Download Dependencies
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Download Execution Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50 card-gradient">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Feature Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              This tool is currently under development. The UI shows the planned workflow for processing project scope sheets.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
