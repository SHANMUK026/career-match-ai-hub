
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, User } from 'lucide-react';

export const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'application',
      title: 'Applied to Frontend Developer',
      company: 'TechStart Inc.',
      time: '2 hours ago',
      status: 'pending',
      icon: <Clock className="h-4 w-4" />
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview completed',
      company: 'Digital Solutions',
      time: '1 day ago',
      status: 'completed',
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: 3,
      type: 'profile',
      title: 'Profile updated',
      company: '',
      time: '3 days ago',
      status: 'info',
      icon: <User className="h-4 w-4" />
    },
    {
      id: 4,
      type: 'application',
      title: 'Application viewed',
      company: 'InnovateLab',
      time: '1 week ago',
      status: 'viewed',
      icon: <AlertCircle className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'viewed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-gray-500 mt-1">{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{activity.title}</p>
              {activity.company && (
                <p className="text-sm text-gray-600">{activity.company}</p>
              )}
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
