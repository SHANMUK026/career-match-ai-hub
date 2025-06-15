
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Search, 
  FileText, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  Star,
  Upload,
  Settings
} from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    {
      title: 'Search Jobs',
      icon: Search,
      description: 'Find your next opportunity',
      href: '/jobs',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Mock Interview',
      icon: MessageSquare,
      description: 'Practice with AI interviewer',
      href: '/mock-interview',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Upload Resume',
      icon: Upload,
      description: 'Update your profile',
      href: '/profile',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Assessment',
      icon: TrendingUp,
      description: 'Take skill assessments',
      href: '/assessments',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'AI Interview',
      icon: Star,
      description: 'Smart AI interviews',
      href: '/smart-interview',
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      title: 'Settings',
      icon: Settings,
      description: 'Manage your account',
      href: '/settings',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Button
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
