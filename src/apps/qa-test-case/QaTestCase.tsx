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
import {
  CheckSquare,
  Plus,
  Send,
  Paperclip,
  Sparkles,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import ChatSidebar from "./components/ChatSidebar";

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

// Mock chat history
const mockChatHistory = [
  {
    id: "1",
    title: "Authentication Test Cases",
    timestamp: "2 hours ago",
    preview: "Generated comprehensive test cases for login functionality..."
  },
  {
    id: "2", 
    title: "API Testing Scenarios",
    timestamp: "1 day ago",
    preview: "Created REST API test cases for user management endpoints..."
  },
  {
    id: "3",
    title: "Checkout Flow Tests",
    timestamp: "2 days ago", 
    preview: "Generated end-to-end test scenarios for e-commerce checkout..."
  },
  {
    id: "4",
    title: "Performance Testing",
    timestamp: "1 week ago",
    preview: "Created load testing scenarios for high-traffic scenarios..."
  },
];

export default function QaTestCase() {
  const [prompt, setPrompt] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, content: string, type: 'user' | 'assistant', timestamp: Date}>>([]);

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
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

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: prompt,
      type: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setPrompt("");
    setSelectedFiles([]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you generate test cases for: "${prompt}". Here are some comprehensive test scenarios based on your request...`,
        type: 'assistant' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
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
    <div className="flex h-full relative -m-6">
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isRightSidebarOpen ? 'mr-80' : 'mr-0'
      }`}>

        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    QA Test Case Generator
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Generate comprehensive test cases and QA documentation with AI
                  </p>
                </div>
              </div>

              {/* Chat History Toggle */}
              <Button
                onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Chat History</span>
                {isRightSidebarOpen ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="px-6 py-6">
            {messages.length === 0 ? (
              /* Welcome State */
              <div className="max-w-4xl mx-auto">
                <Card className="border-border shadow-lg card-gradient">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <CheckSquare className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2 flex items-center justify-center gap-2">
                      Welcome to QA Test Case Generator
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                    </CardTitle>
                    <CardDescription className="text-base">
                      Generate comprehensive test cases, scenarios, and QA documentation using AI assistance.
                      Upload your requirements or describe what you need to test.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                          <CheckSquare className="h-4 w-4" />
                          What you can generate:
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Functional test cases</li>
                          <li>• API testing scenarios</li>
                          <li>• Performance test plans</li>
                          <li>• Security test cases</li>
                          <li>• User acceptance tests</li>
                          <li>• Regression test suites</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          Supported file types:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">PDF</Badge>
                          <Badge variant="secondary">DOC/DOCX</Badge>
                          <Badge variant="secondary">TXT</Badge>
                          <Badge variant="secondary">CSV</Badge>
                          <Badge variant="secondary">XLSX</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Chat Messages */
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                          : 'bg-card border border-border shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-green-100' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="max-w-4xl mx-auto">
              {/* Attached Files */}
              {selectedFiles.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
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

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex gap-2 flex-1">
                  {/* Attach Files Button */}
                  <Button
                    onClick={handleFileAttach}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    title="Attach files"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  {/* Predefined Prompts Dropdown */}
                  <Select onValueChange={handlePromptSelect}>
                    <SelectTrigger className="w-[200px] shrink-0 hidden sm:flex">
                      <SelectValue placeholder="Select prompt..." />
                    </SelectTrigger>
                    <SelectTrigger className="w-full sm:hidden">
                      <SelectValue placeholder="Templates..." />
                    </SelectTrigger>
                    <SelectContent>
                      {predefinedPrompts.map((promptText, index) => (
                        <SelectItem key={index} value={promptText}>
                          {promptText.length > 40 ? `${promptText.slice(0, 40)}...` : promptText}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Input Field */}
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe what test cases you need..."
                    className="flex-1 min-w-0"
                  />
                </div>

                {/* Send Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className="shrink-0 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 sm:w-auto w-full"
                >
                  <Send className="h-4 w-4 mr-2 sm:mr-0" />
                  <span className="sm:hidden">Send</span>
                </Button>
              </div>
            </div>
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
