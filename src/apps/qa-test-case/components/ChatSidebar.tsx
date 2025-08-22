import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  X,
  Clock,
  Search,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatHistoryItem[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  onClose,
  chatHistory,
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-80 transform border-l bg-background dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-transform duration-300 ease-in-out lg:w-80 md:w-72 sm:w-64",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <h2 className="font-semibold text-lg">Chat History</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Chat History List */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {chatHistory.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    No conversations yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Start a new chat to see your history here
                  </p>
                </div>
              ) : (
                chatHistory.map((chat) => (
                  <Card
                    key={chat.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors border-border/50 hover:border-green-200 dark:hover:border-green-800 group"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm truncate flex-1 group-hover:text-green-700 dark:group-hover:text-green-400">
                          {chat.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 ml-2"
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {chat.preview}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{chat.timestamp}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        >
                          QA
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          <div className="border-t border-border p-4">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
              >
                Export
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {chatHistory.length} conversation{chatHistory.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
