import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileCode, Upload, Wand2, Sparkles, Download, Share } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SowToHld() {
  const [requirements, setRequirements] = useState('');

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-2xl -z-10"></div>
        <div className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SOW to HLD Generation
            </h1>
          </div>
          <p className="text-muted-foreground">
            Convert Statement of Work (SOW) documents into High-Level Design (HLD) documents
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="border-border/50 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 card-gradient">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow-lg">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg text-blue-800 dark:text-blue-300">Input Requirements</CardTitle>
              </div>
              <CardDescription>
                Enter your SOW content or upload a document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="requirements">Statement of Work</Label>
                <Textarea
                  id="requirements"
                  placeholder="Enter your SOW requirements here..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
              
              <div className="border-2 border-dashed border-blue-300/50 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 text-center hover:border-blue-400/70 transition-colors">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow-lg mx-auto w-fit mb-2">
                  <FileCode className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                  Or drop a SOW document here
                </p>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300" disabled={!requirements.trim()}>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate HLD
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <Card className="border-border/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 card-gradient">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
                    <FileCode className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-purple-800 dark:text-purple-300">Generated HLD</CardTitle>
                </div>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-300">
                  Preview
                </Badge>
              </div>
              <CardDescription>
                High-level design document output
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-purple-200/50 dark:border-purple-700/50 rounded-lg p-4 min-h-[300px] bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/20">
                {requirements.trim() ? (
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-white/60 dark:bg-background/60 rounded-lg border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        System Overview
                      </h4>
                      <p className="text-muted-foreground">
                        Generated overview will appear here based on your SOW input...
                      </p>
                    </div>
                    <div className="p-3 bg-white/60 dark:bg-background/60 rounded-lg border border-pink-200/30 dark:border-pink-700/30">
                      <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                        Architecture Components
                      </h4>
                      <p className="text-muted-foreground">
                        System components and their relationships...
                      </p>
                    </div>
                    <div className="p-3 bg-white/60 dark:bg-background/60 rounded-lg border border-indigo-200/30 dark:border-indigo-700/30">
                      <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                        Data Flow
                      </h4>
                      <p className="text-muted-foreground">
                        Information flow and processing pipeline...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-center">Enter SOW requirements to generate HLD preview</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" disabled className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-700/50 dark:text-red-300">
                  <Download className="mr-1 h-3 w-3" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" disabled className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-700/50 dark:text-blue-300">
                  <Download className="mr-1 h-3 w-3" />
                  Download Word
                </Button>
                <Button variant="outline" size="sm" disabled className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-700/50 dark:text-green-300">
                  <Share className="mr-1 h-3 w-3" />
                  Share Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-amber-50/50 via-yellow-50/50 to-orange-50/50 dark:from-amber-900/10 dark:via-yellow-900/10 dark:to-orange-900/10 border-amber-200/50 dark:border-amber-700/50 card-gradient">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                <Wand2 className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Feature Coming Soon</h3>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              This tool is currently under development. The UI shows the planned workflow for converting SOW to HLD documents.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
