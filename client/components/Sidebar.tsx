import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { mockApps } from '@/data/mockApps';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, FileText, FileCode, X, Zap, Sparkles } from 'lucide-react';

const iconMap = {
  Home,
  FileText,
  FileCode,
  Zap,
  Sparkles,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Filter apps based on user permissions
  const availableApps = mockApps.filter(app => 
    app.permissions.some(permission => user?.permissions.includes(permission))
  );

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: 'Home' as const,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    },
    ...availableApps.map(app => ({
      name: app.name,
      href: app.route,
      icon: app.icon as keyof typeof iconMap,
      color: app.color,
      bgColor: app.bgGradient.includes('blue') ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-purple-100 dark:bg-purple-900/20',
    })),
  ];

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
          'fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-background dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-transform duration-200 ease-in-out lg:relative lg:top-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="font-semibold">Navigation</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-2 py-4">
              {navigation.map((item) => {
                const IconComponent = iconMap[item.icon];
                const isActive = location.pathname === item.href;

                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start group transition-all duration-200',
                      isActive && 'bg-secondary text-secondary-foreground shadow-sm',
                      !isActive && 'hover:bg-gradient-to-r hover:from-background hover:to-muted/50'
                    )}
                    onClick={() => {
                      // Close mobile sidebar when navigating
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <Link to={item.href} className="flex items-center">
                      <div className={cn(
                        'mr-2 p-1 rounded-md transition-all duration-200',
                        isActive ? item.bgColor : 'group-hover:bg-gradient-to-br group-hover:from-muted group-hover:to-accent/50'
                      )}>
                        <IconComponent className={cn(
                          'h-4 w-4 transition-colors duration-200',
                          isActive ? item.color : 'group-hover:text-primary'
                        )} />
                      </div>
                      {item.name}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>

          {/* User info at bottom */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xs font-bold text-white">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
