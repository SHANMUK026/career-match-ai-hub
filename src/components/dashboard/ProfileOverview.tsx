
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Edit, Settings } from 'lucide-react';

const ProfileOverview = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Profile Overview</CardTitle>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold">Thomas Anderson</h3>
            <p className="text-gray-600 mb-2">Senior Software Developer</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                React
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                TypeScript
              </span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                Node.js
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                AWS
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm font-medium">70%</span>
          </div>
          <Progress value={70} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">AI Match Score</span>
            <span className="font-semibold text-primary">92/100</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Job Applications</span>
            <span className="font-semibold">12</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Interviews Scheduled</span>
            <span className="font-semibold">3</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Completed Assessments</span>
            <span className="font-semibold">4/5</span>
          </div>
        </div>

        <div className="mt-6">
          <Button className="w-full flex items-center justify-center bg-primary-gradient">
            <Edit className="mr-2 h-4 w-4" />
            Complete Your Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
