import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-gradient-to-r from-background via-muted/20 to-background dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-between space-y-2 text-sm text-muted-foreground sm:flex-row sm:space-y-0">
          <div className="flex items-center space-x-2">
            <p>© {currentYear} Manager Assistant. All rights reserved.</p>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-3 w-3 text-yellow-500" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
              Version 1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
