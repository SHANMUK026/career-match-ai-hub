
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileOverview from '@/components/dashboard/ProfileOverview';
import JobRecommendations from '@/components/dashboard/JobRecommendations';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentApplications } from '@/components/dashboard/RecentApplications';

const Dashboard = () => {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <Header />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Welcome back to your dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your job search progress and discover new opportunities
            </p>
          </motion.div>

          {/* Dashboard Stats Overview */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <DashboardStats />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div variants={itemVariants}>
                <ProfileOverview />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <JobRecommendations />
              </motion.div>

              <motion.div variants={itemVariants}>
                <RecentApplications />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <QuickActions />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <ActivityFeed />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
