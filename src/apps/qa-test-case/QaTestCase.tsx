import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CSVLink } from "react-csv";
import {
  CheckSquare,
  Plus,
  Send,
  Paperclip,
  Sparkles,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Download,
  Table,
  AlertCircle,
} from "lucide-react";
import ChatSidebar from "./components/ChatSidebar";
import CSVTable from "./components/CSVTable";

// Mock data for pre-existing prompts
const predefinedPrompts = [
  "Generate test cases for user authentication flow",
  "Create API testing scenarios for REST endpoints",
  "Write regression test cases for checkout process",
  "Generate performance test scenarios",
  "Create accessibility test cases for web forms",
  "Write security test cases for file upload",
  "Generate mobile app test scenarios",
  "Create database testing test cases",
  "Write integration test scenarios",
  "Generate edge case test scenarios",
];

// Mock chat history - this would be populated from actual conversations
const mockChatHistory = [
  {
    id: "1",
    title: "Authentication Test Cases",
    timestamp: "2 hours ago",
    preview: "Generated 18 comprehensive test cases for login functionality with Google OAuth..."
  },
  {
    id: "2",
    title: "API Testing Scenarios",
    timestamp: "1 day ago",
    preview: "Created 25 REST API test cases for user management endpoints including validation..."
  },
  {
    id: "3",
    title: "Checkout Flow Tests",
    timestamp: "2 days ago",
    preview: "Generated 32 end-to-end test scenarios for e-commerce checkout process..."
  },
  {
    id: "4",
    title: "Performance Testing",
    timestamp: "1 week ago",
    preview: "Created 15 load testing scenarios for high-traffic scenarios and edge cases..."
  },
];

interface CSVRow {
  [key: string]: string;
}

export default function QaTestCase() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, content: string, type: 'user' | 'assistant', timestamp: Date, csvData?: CSVRow[], csvHeaders?: any[]}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCsvData, setCurrentCsvData] = useState<CSVRow[]>([]);
  const [currentCsvHeaders, setCurrentCsvHeaders] = useState<any[]>([]);

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const parseCSVData = (csvString: string) => {
    // Remove the markdown code block wrapper
    const cleanCsv = csvString.replace(/```csv\n?/g, '').replace(/```\n?/g, '').trim();

    const lines = cleanCsv.split('\n');
    if (lines.length < 2) return { data: [], headers: [] };

    const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
    const csvHeaders = headers.map(header => ({
      label: header,
      key: header.toLowerCase().replace(/\s+/g, '_')
    }));

    const data = lines.slice(1).map(line => {
      const values = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const row: CSVRow = {};
      headers.forEach((header, index) => {
        const key = header.toLowerCase().replace(/\s+/g, '_');
        row[key] = values[index]?.replace(/"/g, '') || '';
      });

      return row;
    });

    return { data, headers: csvHeaders };
  };

  const callQAAPI = async (userPrompt: string, files: File[]) => {
    const formData = new FormData();
    formData.append('prompt', userPrompt);

    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://35.241.31.6:80/api/qa/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        return parseCSVData(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  const handleFileAttach = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.txt,.csv,.xlsx';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      setSelectedFiles(prev => [...prev, ...files]);
    };
    input.click();
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: prompt,
      type: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const currentPrompt = prompt;
    const currentFiles = [...selectedFiles];

    setPrompt("");
    setSelectedFiles([]);

    try {
      toast({
        title: "🔄 Generating Test Cases",
        description: "Processing your request and generating comprehensive test cases...",
        className: "bg-blue-50 border-blue-200 text-blue-800",
      });

      const { data, headers } = await callQAAPI(currentPrompt, currentFiles);

      setCurrentCsvData(data);
      setCurrentCsvHeaders(headers);

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: `Generated ${data.length} test cases successfully! You can view them in the table below or download as CSV.`,
        type: 'assistant' as const,
        timestamp: new Date(),
        csvData: data,
        csvHeaders: headers
      };

      setMessages(prev => [...prev, aiResponse]);

      toast({
        title: "✅ Test Cases Generated",
        description: `Successfully generated ${data.length} test cases. View or download below.`,
        className: "bg-green-50 border-green-200 text-green-800",
      });

    } catch (error) {
      console.error('Failed to generate test cases:', error);

      const errorResponse = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error while generating test cases: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        type: 'assistant' as const,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorResponse]);

      toast({
        title: "❌ Error",
        description: "Failed to generate test cases. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-full relative -m-6 bg-background dark:bg-slate-900">
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isRightSidebarOpen ? 'mr-80' : 'mr-0'
      }`}>

        {/* Chat History Toggle - Minimal */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col justify-center px-6">
            {messages.length === 0 ? (
              /* Gemini-style Welcome State */
              <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Greeting */}
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-normal">
                    <span className="text-blue-500">Hello,</span>
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-normal text-muted-foreground">
                    QA Test Case Generator for Niveus Solutions
                  </h2>
                </div>

                {/* Main Input Area - Gemini Style */}
                <div className="w-full max-w-3xl mx-auto">
                  <div className="relative">
                    {/* Attached Files */}
                    {selectedFiles.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2 justify-center">
                        {selectedFiles.map((file, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-2 p-2"
                          >
                            <Paperclip className="h-3 w-3" />
                            {file.name}
                            <button
                              onClick={() => removeFile(index)}
                              className="ml-1 hover:text-destructive"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Input Container */}
                    <div className="relative bg-muted/50 dark:bg-slate-800/50 rounded-full border border-border hover:border-border/80 transition-colors">
                      <div className="flex items-center px-4 py-4">
                        {/* Add Files/Tools Button */}
                        <Button
                          onClick={handleFileAttach}
                          variant="ghost"
                          size="sm"
                          className="rounded-full h-8 w-8 p-0 mr-3 hover:bg-muted"
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>

                        {/* Templates Dropdown */}
                        <Select onValueChange={handlePromptSelect} disabled={isLoading}>
                          <SelectTrigger className="border-0 bg-transparent shadow-none h-auto p-0 mr-3 w-auto hover:bg-muted rounded-md">
                            <div className="flex items-center gap-1 px-2 py-1">
                              <Sparkles className="h-4 w-4" />
                              <span className="text-sm">Templates</span>
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {predefinedPrompts.map((promptText, index) => (
                              <SelectItem key={index} value={promptText}>
                                {promptText.length > 50 ? `${promptText.slice(0, 50)}...` : promptText}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Main Input */}
                        <input
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={isLoading ? "Generating test cases..." : "Enter a prompt for QA Test Case Generator"}
                          className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-base"
                          disabled={isLoading}
                        />

                        {/* Mic Icon */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full h-8 w-8 p-0 ml-3 hover:bg-muted"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </Button>
                      </div>

                      {/* Send Button */}
                      {prompt.trim() && !isLoading && (
                        <Button
                          onClick={handleSubmit}
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                        >
                          <Send className="h-3 w-3" />
                        </Button>
                      )}

                      {/* Loading indicator in input */}
                      {isLoading && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtle Feature Hints */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Generate test cases • Upload requirements • Create QA documentation</p>
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="max-w-5xl mx-auto space-y-6 py-8">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-4">
                    <div
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-8'
                            : 'bg-muted mr-8'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 opacity-70`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* CSV Table for assistant messages with CSV data */}
                    {message.type === 'assistant' && message.csvData && message.csvHeaders && (
                      <div className="w-full">
                        <CSVTable
                          data={message.csvData}
                          headers={message.csvHeaders}
                          fileName={`qa-test-cases-${message.timestamp.getTime()}.csv`}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-3 mr-8">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></div>
                        <span className="text-sm text-muted-foreground ml-2">
                          Generating test cases...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Input at bottom when chatting */}
                <div className="sticky bottom-0 pt-4">
                  <div className="relative bg-muted/50 dark:bg-slate-800/50 rounded-full border border-border">
                    <div className="flex items-center px-4 py-3">
                      <Button
                        onClick={handleFileAttach}
                        variant="ghost"
                        size="sm"
                        className="rounded-full h-8 w-8 p-0 mr-3"
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>

                      <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Continue the conversation..."
                        className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />

                      {prompt.trim() && !isLoading && (
                        <Button
                          onClick={handleSubmit}
                          size="sm"
                          className="rounded-full h-8 w-8 p-0 ml-3"
                        >
                          <Send className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Chat History */}
      <ChatSidebar
        isOpen={isRightSidebarOpen}
        onClose={() => setIsRightSidebarOpen(false)}
        chatHistory={mockChatHistory}
      />
    </div>
  );
}
