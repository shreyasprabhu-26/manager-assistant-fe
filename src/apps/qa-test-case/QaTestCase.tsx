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
                        >
                          <Plus className="h-4 w-4" />
                        </Button>

                        {/* Templates Dropdown */}
                        <Select onValueChange={handlePromptSelect}>
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
                          placeholder="Enter a prompt for QA Test Case Generator"
                          className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-base"
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
                      {prompt.trim() && (
                        <Button
                          onClick={handleSubmit}
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                        >
                          <Send className="h-3 w-3" />
                        </Button>
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
              <div className="max-w-3xl mx-auto space-y-6 py-8">
                {messages.map((message) => (
                  <div
                    key={message.id}
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
                ))}

                {/* Input at bottom when chatting */}
                <div className="sticky bottom-0 pt-4">
                  <div className="relative bg-muted/50 dark:bg-slate-800/50 rounded-full border border-border">
                    <div className="flex items-center px-4 py-3">
                      <Button
                        onClick={handleFileAttach}
                        variant="ghost"
                        size="sm"
                        className="rounded-full h-8 w-8 p-0 mr-3"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>

                      <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Continue the conversation..."
                        className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
                      />

                      {prompt.trim() && (
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
