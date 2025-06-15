
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Briefcase,
  MessageSquare,
  Star
} from 'lucide-react';

export const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'application',
      title: 'Applied to Software Engineer at TechCorp',
      time: '2 hours ago',
      status: 'pending',
      icon: Briefcase
    },
    {
      id: 2,
      type: 'interview',
      title: 'Completed mock interview',
      time: '1 day ago',
      status: 'completed',
      icon: MessageSquare
    },
    {
      id: 3,
      type: 'assessment',
      title: 'JavaScript assessment passed',
      time: '2 days ago',
      status: 'completed',
      icon: Star
    },
    {
      id: 4,
      type: 'application',
      title: 'Application viewed by StartupXYZ',
      time: '3 days ago',
      status: 'viewed',
      icon: Briefcase
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'viewed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'viewed':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const StatusIcon = getStatusIcon(activity.status);
            const ActivityIcon = activity.icon;
            
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ActivityIcon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(activity.status)}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {activity.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
