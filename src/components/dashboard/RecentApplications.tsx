
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const RecentApplications = () => {
  const applications = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      appliedDate: "2 days ago",
      status: "reviewing",
      salary: "$95,000 - $120,000",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      appliedDate: "5 days ago",
      status: "interview",
      salary: "$80,000 - $100,000",
      location: "Remote"
    },
    {
      id: 3,
      company: "Enterprise Solutions",
      position: "React Developer",
      appliedDate: "1 week ago",
      status: "rejected",
      salary: "$70,000 - $90,000",
      location: "New York, NY"
    },
    {
      id: 4,
      company: "InnovateLab",
      position: "UI/UX Developer",
      appliedDate: "2 weeks ago",
      status: "viewed",
      salary: "$85,000 - $110,000",
      location: "Austin, TX"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reviewing':
        return <Clock className="h-4 w-4" />;
      case 'interview':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'viewed':
        return <Eye className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'interview':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'viewed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Applications</CardTitle>
          <Button variant="outline" size="sm">
            View All
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application, index) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-sm">{application.position}</h3>
                  <Badge className={getStatusColor(application.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(application.status)}
                      <span className="capitalize">{application.status}</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {application.company}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{application.location}</span>
                  <span>{application.salary}</span>
                  <span>{application.appliedDate}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
