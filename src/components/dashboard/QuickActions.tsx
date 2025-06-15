
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Search, Calendar, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <Upload className="h-5 w-5" />,
      title: "Upload Resume",
      description: "Update your resume",
      onClick: () => navigate('/profile')
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Find Jobs",
      description: "Search for opportunities",
      onClick: () => navigate('/jobs')
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Schedule Interview",
      description: "Book a mock interview",
      onClick: () => navigate('/mock-interview')
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "AI Assessment",
      description: "Take skill assessment",
      onClick: () => navigate('/assessments')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start h-auto p-4"
            onClick={action.onClick}
          >
            <div className="flex items-center space-x-3">
              <div className="text-primary">{action.icon}</div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-gray-500">{action.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
