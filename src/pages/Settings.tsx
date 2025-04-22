
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { User, Save, Upload, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { ThemeSwitcher } from '@/components/settings/ThemeSwitcher';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Theme } from '@/types/profile';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showNotification, setShowNotification] = useState(true);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    location: '',
    notificationsEmail: true,
    notificationsApp: true,
    notificationsInterviews: true,
    notificationsJobs: true,
    theme: theme as Theme,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile data');
          return;
        }
        
        if (data) {
          setUserData({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: session.user.email || '',
            title: data.title || '',
            location: data.location || '',
            notificationsEmail: data.notifications_email !== false,
            notificationsApp: data.notifications_app !== false,
            notificationsInterviews: data.notifications_interviews !== false,
            notificationsJobs: data.notifications_jobs !== false,
            theme: data.theme || 'system',
          });
        } else {
          setUserData(prev => ({
            ...prev,
            email: session.user.email || '',
          }));
        }
      } catch (error) {
        console.error('Settings fetch error:', error);
        toast.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please sign in to save changes');
        navigate('/login');
        return;
      }
      
      // Only update fields that exist in the database schema
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: userData.firstName,
          last_name: userData.lastName,
          title: userData.title,
          location: userData.location,
          notifications_email: userData.notificationsEmail,
          notifications_app: userData.notificationsApp,
          notifications_interviews: userData.notificationsInterviews,
          notifications_jobs: userData.notificationsJobs,
          theme: userData.theme,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);
      
      if (error) {
        console.error('Update profile error:', error);
        toast.error('Failed to update profile: ' + error.message);
        throw error;
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (field: string, value: boolean) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div 
          className="animate-pulse space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 py-6 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="flex items-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <User className="text-gray-600 dark:text-gray-300 mr-3" />
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </motion.div>
        
        <AnimatePresence>
          {showNotification && (
            <motion.div 
              className="mb-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between"
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <AlertCircle className="text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                <p className="font-medium">Account deletion is currently disabled.</p>
              </div>
              <button onClick={() => setShowNotification(false)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-6">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="flex-1 space-y-6">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="profile" className="m-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal information and how you appear on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
                        <div className="flex flex-col items-center">
                          <Avatar className="w-24 h-24 border-2 border-gray-200 dark:border-gray-700 mb-4 shadow-md">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`} />
                            <AvatarFallback className="text-xl bg-primary text-white">
                              {userData.firstName?.charAt(0) || '?'}{userData.lastName?.charAt(0) || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm" className="mb-2">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </Button>
                          <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG. Max 2MB</p>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input 
                                id="firstName"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                className="transition-shadow focus:shadow-md"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input 
                                id="lastName"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter your last name"
                                className="transition-shadow focus:shadow-md"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email"
                              name="email"
                              value={userData.email}
                              readOnly
                              className="bg-gray-100 dark:bg-gray-800"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400">Contact support to change your email address.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Professional Title</Label>
                            <Input 
                              id="title"
                              name="title"
                              value={userData.title}
                              onChange={handleInputChange}
                              placeholder="e.g. Senior Software Engineer"
                              className="transition-shadow focus:shadow-md"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input 
                              id="location"
                              name="location"
                              value={userData.location}
                              onChange={handleInputChange}
                              placeholder="e.g. San Francisco, CA"
                              className="transition-shadow focus:shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="flex justify-end"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg px-6 text-white"
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="appearance" className="m-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize how the application looks for you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Theme Preference</h3>
                        <ThemeSwitcher />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="account" className="m-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle>Account Security</CardTitle>
                      <CardDescription>Manage your account security settings and password.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input 
                            id="current-password" 
                            type="password" 
                            placeholder="••••••••"
                            className="transition-shadow focus:shadow-md"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input 
                              id="new-password" 
                              type="password" 
                              placeholder="••••••••"
                              className="transition-shadow focus:shadow-md"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input 
                              id="confirm-password" 
                              type="password" 
                              placeholder="••••••••"
                              className="transition-shadow focus:shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Password Requirements</h3>
                        <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-400 list-disc list-inside">
                          <li>At least 8 characters long</li>
                          <li>Include at least one uppercase letter</li>
                          <li>Include at least one number</li>
                          <li>Include at least one special character</li>
                        </ul>
                      </div>
                      
                      <motion.div 
                        className="flex justify-end"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-white"
                          onClick={() => toast.info("Password change functionality coming soon")}
                        >
                          Update Password
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Control when and how you receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-4">Notification Channels</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Email Notifications</p>
                              <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                            <Switch 
                              checked={userData.notificationsEmail}
                              onCheckedChange={(checked) => handleSwitchChange('notificationsEmail', checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">App Notifications</p>
                              <p className="text-sm text-gray-500">Receive in-app notifications</p>
                            </div>
                            <Switch 
                              checked={userData.notificationsApp}
                              onCheckedChange={(checked) => handleSwitchChange('notificationsApp', checked)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-medium text-lg mb-4">Notification Types</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Interview Reminders</p>
                              <p className="text-sm text-gray-500">Upcoming interview notifications</p>
                            </div>
                            <Switch 
                              checked={userData.notificationsInterviews}
                              onCheckedChange={(checked) => handleSwitchChange('notificationsInterviews', checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Job Recommendations</p>
                              <p className="text-sm text-gray-500">New job matches based on your profile</p>
                            </div>
                            <Switch 
                              checked={userData.notificationsJobs}
                              onCheckedChange={(checked) => handleSwitchChange('notificationsJobs', checked)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="flex justify-end"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          {isSaving ? 'Saving...' : 'Save Preferences'}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="privacy" className="m-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Control your profile visibility and data sharing preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-4">Profile Visibility</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="profile-visibility">Who can see your profile</Label>
                            <Select defaultValue="employers" onValueChange={(value) => toast.info(`Profile visibility set to: ${value}`)}>
                              <SelectTrigger id="profile-visibility" className="w-full">
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public - Anyone can view</SelectItem>
                                <SelectItem value="employers">Employers Only</SelectItem>
                                <SelectItem value="private">Private - Only you</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="resume-visibility">Resume visibility</Label>
                            <Select defaultValue="approved" onValueChange={(value) => toast.info(`Resume visibility set to: ${value}`)}>
                              <SelectTrigger id="resume-visibility" className="w-full">
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Visible to all employers</SelectItem>
                                <SelectItem value="approved">Only when you apply</SelectItem>
                                <SelectItem value="hidden">Hidden - Manual sharing only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-medium text-lg mb-4">Data Sharing</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Share profile with partners</p>
                              <p className="text-sm text-gray-500">Allow sharing with trusted job platforms</p>
                            </div>
                            <Switch 
                              defaultChecked={false}
                              onCheckedChange={() => toast.info("Partner sharing settings updated")}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Usage analytics</p>
                              <p className="text-sm text-gray-500">Help improve our platform with usage data</p>
                            </div>
                            <Switch 
                              defaultChecked={true}
                              onCheckedChange={() => toast.info("Analytics preferences updated")}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Your Data Rights</h3>
                        <p className="text-sm text-blue-700 mb-3">You can request a copy of your data or request deletion at any time.</p>
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            className="text-blue-700 border-blue-300 hover:bg-blue-50"
                            onClick={() => toast.info("Data export request received")}
                          >
                            Export Data
                          </Button>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="flex justify-end"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                          onClick={() => toast.success("Privacy settings saved")}
                        >
                          Save Privacy Settings
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
