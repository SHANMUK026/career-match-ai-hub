
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Calendar, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardStats = () => {
  const stats = [
    {
      title: "Applications Sent",
      value: 12,
      target: 20,
      icon: <Target className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Interviews Scheduled",
      value: 3,
      target: 5,
      icon: <Calendar className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      title: "Profile Views",
      value: 24,
      target: 50,
      icon: <Users className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      title: "Response Rate",
      value: 25,
      target: 100,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center justify-between">
                {stat.title}
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  / {stat.target}
                </span>
              </div>
              <div className="space-y-2">
                <Progress 
                  value={(stat.value / stat.target) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs">
                    {Math.round((stat.value / stat.target) * 100)}% complete
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {stat.target - stat.value} remaining
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
