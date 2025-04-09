
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Search, User, Calendar, BarChart4, FileText, Settings, Home } from 'lucide-react';
import ProfileOverview from '@/components/dashboard/ProfileOverview';
import JobRecommendations from '@/components/dashboard/JobRecommendations';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<{ firstName?: string; lastName?: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user?.id) {
        const { data } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .single();
          
        if (data) {
          setProfileData({
            firstName: data.first_name,
            lastName: data.last_name
          });
        }
      }
    };
    
    fetchProfile();
  }, []);

  const getInitials = () => {
    if (profileData?.firstName && profileData?.lastName) {
      return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
    }
    return "U";
  };
  
  const getProfileName = () => {
    if (profileData?.firstName) {
      return profileData.firstName;
    }
    return "User";
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-secondary to-secondary/90 text-white h-screen fixed shadow-lg hidden md:block">
          <div className="p-4 border-b border-white/10">
            <Link to="/" className="text-xl font-poppins font-bold text-white">CareerMatchAI</Link>
          </div>
          <div className="p-4">
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-white/10 transition-all"
                onClick={() => handleNavigate('/dashboard')}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => handleNavigate('/jobs')}
              >
                <FileText className="mr-2 h-5 w-5" />
                Applications
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => handleNavigate('/jobs')}
              >
                <BarChart4 className="mr-2 h-5 w-5" />
                AI Job Matches
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => handleNavigate('/mock-interview')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Interviews
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => handleNavigate('/profile')}
              >
                <User className="mr-2 h-5 w-5" />
                Profile
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => handleNavigate('/settings')}
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
          <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-bold md:hidden">Dashboard</h1>
              <div className="relative flex-1 max-w-md mx-4 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="mr-2 relative hover:bg-gray-100 transition-colors">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-4 pt-4 pb-2">
                      <h3 className="font-medium">Notifications</h3>
                      <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80">Mark all as read</Button>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="max-h-80 overflow-y-auto">
                      <div className="py-2 px-4 bg-blue-50 border-l-4 border-blue-500 mb-1">
                        <p className="text-sm font-medium">New interview invitation</p>
                        <p className="text-xs text-gray-500">TechCorp Inc. has invited you to an interview</p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                      <div className="py-2 px-4">
                        <p className="text-sm font-medium">Job match alert</p>
                        <p className="text-xs text-gray-500">3 new jobs match your profile</p>
                        <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                      </div>
                      <div className="py-2 px-4">
                        <p className="text-sm font-medium">Profile viewed</p>
                        <p className="text-xs text-gray-500">InnovateTech viewed your profile</p>
                        <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2 flex justify-center">
                      <Button variant="ghost" className="text-sm text-primary w-full">View all notifications</Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full h-9 w-9 p-0 overflow-hidden hover:bg-gray-100 transition-colors">
                      <Avatar className="h-9 w-9">
                        <AvatarImage 
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials()}`} 
                          alt="Profile" 
                        />
                        <AvatarFallback className="bg-primary text-white text-sm">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center space-x-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials()}`} 
                          alt="Profile" 
                        />
                        <AvatarFallback className="bg-primary text-white text-sm">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-0.5">
                        <p className="text-sm font-medium line-clamp-1">{profileData?.firstName} {profileData?.lastName}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{profileData?.firstName ? 'Premium Member' : 'Member'}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600 focus:text-red-600"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        navigate('/');
                        toast.success("Logged out successfully");
                      }}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-4 md:p-6 overflow-auto animate-fade-in">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Welcome back, {getProfileName()}!
              </h1>
              <p className="text-gray-600">Here's what's happening with your job search today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-0" onClick={() => handleNavigate('/jobs')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Applied Jobs</p>
                      <h3 className="text-2xl font-bold mt-1 text-gray-800">12</h3>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-0" onClick={() => handleNavigate('/mock-interview')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Interviews</p>
                      <h3 className="text-2xl font-bold mt-1 text-gray-800">3</h3>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-0" onClick={() => handleNavigate('/jobs')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Match Score</p>
                      <h3 className="text-2xl font-bold mt-1 text-gray-800">92%</h3>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <BarChart4 className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-0"
                onClick={() => handleNavigate('/profile')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Profile Views</p>
                      <h3 className="text-2xl font-bold mt-1 text-gray-800">48</h3>
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
