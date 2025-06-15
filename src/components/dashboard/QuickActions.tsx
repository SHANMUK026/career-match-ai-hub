
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Search, Calendar, MessageSquare, FileText, Target, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <Upload className="h-5 w-5" />,
      title: "Upload Resume",
      description: "Update your resume",
      onClick: () => navigate('/profile'),
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      isNew: false
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Find Jobs",
      description: "Search for opportunities",
      onClick: () => navigate('/jobs'),
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      isNew: false
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Schedule Interview",
      description: "Book a mock interview",
      onClick: () => navigate('/mock-interview'),
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      isNew: true
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "AI Assessment",
      description: "Take skill assessment",
      onClick: () => navigate('/assessments'),
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      isNew: false
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Smart Interview",
      description: "AI-powered interview prep",
      onClick: () => navigate('/smart-interview'),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950",
      isNew: true
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Set Goals",
      description: "Track application targets",
      onClick: () => navigate('/settings'),
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      isNew: false
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "View Analytics",
      description: "Track your progress",
      onClick: () => navigate('/dashboard'),
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      isNew: false
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Network",
      description: "Connect with professionals",
      onClick: () => navigate('/network'),
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950",
      isNew: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Quick Actions
          <Badge variant="secondary" className="text-xs">
            {actions.filter(a => a.isNew).length} New
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-3"
        >
          {actions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200 relative overflow-hidden group"
                onClick={action.onClick}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`p-2 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <div className={action.color}>{action.icon}</div>
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium flex items-center space-x-2">
                      <span>{action.title}</span>
                      {action.isNew && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {action.description}
                    </div>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};
