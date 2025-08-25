import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { mockApps } from "@/data/mockApps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  FileCode,
  ArrowRight,
  Zap,
  Sparkles,
  Star,
  Rocket,
  Heart,
  TrendingUp,
  Users,
  CheckCircle,
  CheckSquare,
  Clock,
  BarChart3,
  Calendar,
  Bell,
  Activity,
  Target,
  Briefcase,
  Plus,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const iconMap = {
  FileText,
  FileCode,
  Zap,
  Sparkles,
  CheckSquare,
  Star,
  Rocket,
  Heart,
};

export default function Dashboard() {
  const { user } = useAuth();

  // Filter apps based on user permissions
  const availableApps = mockApps.filter((app) =>
    app.permissions.some((permission) =>
      user?.permissions.includes(permission),
    ),
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl -z-10"></div>
        <div className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-3 w-3 text-yellow-300 fill-current" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {user?.name}
            </h1>
            <Heart className="h-5 w-5 text-red-500 fill-current animate-pulse" />
          </div>
          <p className="text-muted-foreground flex items-center space-x-1">
            <Rocket className="h-4 w-4 text-blue-500" />
            <span> Manage track, and access all tools from one place</span>
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Scope Sheets Processed
                </p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8 this week
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  HLD Documents
                </p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-green-600 flex items-center">
                  <FileCode className="h-3 w-3 mr-1" />
                  Generated this month
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <FileCode className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Tasks Generated
                </p>
                <p className="text-2xl font-bold">1,284</p>
                <p className="text-xs text-green-600 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  From 47 scope sheets
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Processing Time
                </p>
                <p className="text-2xl font-bold">2.4m</p>
                <p className="text-xs text-green-600 flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  Avg. per scope sheet
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Apps and Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Your Applications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center">
                <Sparkles className="h-6 w-6 text-purple-500 mr-2" />
                Your Applications
              </h2>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-purple-300"
              >
                {availableApps.length} Available
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableApps.map((app) => {
                const IconComponent = iconMap[app.icon as keyof typeof iconMap];

                return (
                  <Card
                    key={app.id}
                    className="group hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-2 border-border/50 relative overflow-hidden card-gradient"
                  >
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${app.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity`}
                    ></div>

                    <CardHeader className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-3 bg-gradient-to-br ${app.bgGradient} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                          >
                            <IconComponent
                              className={`h-6 w-6 ${app.color} group-hover:animate-pulse`}
                            />
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-white/80 dark:bg-black/80 backdrop-blur-sm border-0 shadow-sm"
                          >
                            {app.category}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-semibold group-hover:text-foreground/90 transition-colors">
                        {app.name}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                        {app.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      >
                        <Link
                          to={app.route}
                          className="flex items-center justify-center text-white font-medium"
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          Open App
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Future Apps */}
            <Card className="card-gradient mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 text-purple-500 mr-2" />
                  Future Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full mb-3">
                    <Rocket className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-base font-medium">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    New productivity tools and applications will be added here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Activity and Notifications */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 text-green-500 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      E-commerce scope sheet processed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Generated 156 tasks • 2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Mobile App HLD generated
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Architecture document created • 4 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      CRM project dependencies mapped
                    </p>
                    <p className="text-xs text-muted-foreground">
                      84 dependencies identified • 6 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Banking portal task serialization
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Execution order optimized • 1 day ago
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full justify-between">
                View all activity
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Processing Overview */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
                Processing Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Scope Sheets Queue
                  </span>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                    5
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Processing Active</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                    2
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">HLD Generation</span>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                    3
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completed Today</span>
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                    12
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>System Efficiency</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {availableApps.length === 0 && (
        <Card className="text-center py-12 card-gradient">
          <CardContent>
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No apps available</h3>
                <p className="text-muted-foreground">
                  Contact your administrator to get access to applications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
