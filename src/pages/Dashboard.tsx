
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Search, User, Calendar, BarChart4, FileText, Settings, Home } from 'lucide-react';
import ProfileOverview from '@/components/dashboard/ProfileOverview';
import JobRecommendations from '@/components/dashboard/JobRecommendations';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-secondary text-white h-screen fixed shadow-lg hidden md:block">
          <div className="p-4 border-b border-white/10">
            <Link to="/" className="text-xl font-poppins font-bold">CareerMatchAI</Link>
          </div>
          <div className="p-4">
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-white/10"
                onClick={() => handleNavigate('/dashboard')}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => handleNavigate('/jobs')}
              >
                <FileText className="mr-2 h-5 w-5" />
                Applications
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => handleNavigate('/jobs')}
              >
                <BarChart4 className="mr-2 h-5 w-5" />
                AI Job Matches
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => handleNavigate('/mock-interview')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Interviews
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => {
                  handleNavigate('/dashboard');
                  toast.info("Profile section is coming soon");
                }}
              >
                <User className="mr-2 h-5 w-5" />
                Profile
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => {
                  handleNavigate('/dashboard');
                  toast.info("Settings section is coming soon");
                }}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 transition-all">
          {/* Top Navigation */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-bold md:hidden">Dashboard</h1>
              <div className="relative flex-1 max-w-md mx-4 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="mr-2 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer"
                     onClick={() => toast.info("Profile section is coming soon")}>
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-4 md:p-6 overflow-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Thomas!</h1>
              <p className="text-gray-600">Here's what's happening with your job search today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('/jobs')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Applied Jobs</p>
                      <h3 className="text-2xl font-bold mt-1">12</h3>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('/mock-interview')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Interviews</p>
                      <h3 className="text-2xl font-bold mt-1">3</h3>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('/jobs')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Match Score</p>
                      <h3 className="text-2xl font-bold mt-1">92%</h3>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <BarChart4 className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => toast.info("Profile section is coming soon")}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Profile Views</p>
                      <h3 className="text-2xl font-bold mt-1">48</h3>
                    </div>
                    <div className="p-3 bg-amber-100 rounded-full">
                      <User className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Components */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ProfileOverview />
              </div>
              <div className="lg:col-span-2">
                <JobRecommendations />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
