export interface MicroApp {
  id: string;
  name: string;
  description: string;
  route: string;
  icon: string;
  permissions: string[];
  category: string;
  color: string;
  bgGradient: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  permissions: string[];
}

export const mockApps: MicroApp[] = [
  {
    id: 'manager-assist',
    name: 'Manager Assist',
    description: 'Process project scope sheets and generate tasks, dependencies, and task serialization.',
    route: '/manager-assist',
    icon: 'Zap',
    permissions: ['manager', 'admin'],
    category: 'Project Management',
    color: 'text-blue-600',
    bgGradient: 'from-blue-500/10 to-indigo-500/10'
  },
  {
    id: 'sow-to-hld',
    name: 'SOW to HLD Generation',
    description: 'Convert Statement of Work (SOW) documents into High-Level Design (HLD) documents.',
    route: '/sow-to-hld',
    icon: 'Sparkles',
    permissions: ['manager', 'admin', 'architect'],
    category: 'Documentation',
    color: 'text-purple-600',
    bgGradient: 'from-purple-500/10 to-pink-500/10'
  }
];

export const mockUser: User = {
  id: 'user-1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
  role: 'manager',
  permissions: ['manager', 'admin']
};
