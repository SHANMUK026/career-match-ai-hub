import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock, Bell, Shield, Palette, Trash2, Save, Upload, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Profile, UserData } from '@/types/profile';
import { cn } from '@/lib/utils';

const Settings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showNotification, setShowNotification] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    location: '',
    bio: '',
    experience: '',
    education: '',
    notificationsEmail: true,
    notificationsApp: true,
    notificationsInterviews: true,
    notificationsJobs: true,
    theme: 'system',
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
          // Cast data to Profile type to properly handle optional fields
          const profile = data as unknown as Profile;
          
          setUserData({
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            email: session.user.email || '',
            title: profile.title || '',
            location: profile.location || '',
            bio: profile.bio || '',
            experience: profile.experience || '',
            education: profile.education || '',
            notificationsEmail: profile.notifications_email !== false,
            notificationsApp: profile.notifications_app !== false,
            notificationsInterviews: profile.notifications_interviews !== false,
            notificationsJobs: profile.notifications_jobs !== false,
            theme: profile.theme || 'system',
          });
        } else {
          // Set email from session if profile not found
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
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: userData.firstName,
          last_name: userData.lastName,
          title: userData.title,
          location: userData.location,
          bio: userData.bio,
          experience: userData.experience,
          education: userData.education,
          notifications_email: userData.notificationsEmail,
          notifications_app: userData.notificationsApp,
          notifications_interviews: userData.notificationsInterviews,
          notifications_jobs: userData.notificationsJobs,
          theme: userData.theme,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);
      
      if (error) {
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

  const handleSwitchChange = (name: string, checked: boolean) => {
    setUserData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-64 bg-gray-200 rounded w-96"></div>
        </div>
      </div>
    );
  }

  const NavItem = ({ id, label, icon, active }: { id: string; label: string; icon: React.ReactNode; active: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "flex items-center gap-3 w-full px-5 py-4 text-left rounded-md transition-all",
        active ? "bg-blue-600 text-white" : "hover:bg-gray-100"
      )}
    >
      <div className="w-6 h-6 flex items-center justify-center">
        {icon}
      </div>
      <span className={active ? "font-medium" : ""}>{label}</span>
    </button>
  );

  const ThemeCard = ({ theme, label, current, onClick }: { theme: string; label: string; current: string; onClick: () => void }) => (
    <div 
      className={cn(
        "border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md",
        current === theme ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "h-20 w-full",
        theme === 'light' ? "bg-white" : 
        theme === 'dark' ? "bg-gray-900" : 
        "bg-gradient-to-r from-white to-gray-900"
      )}></div>
      <div className="p-3 text-center">
        <p className="font-medium">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center mb-8">
          <User className="text-gray-600 mr-3" />
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </div>
        
        {showNotification && (
          <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="text-blue-600 mr-3 flex-shrink-0" />
              <p className="font-medium">Account deletion is currently disabled.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-gray-500 hover:text-gray-800">
              <X size={18} />
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 bg-white rounded-xl shadow-sm">
            <div className="p-3">
              <NavItem id="profile" label="Profile" icon={<User size={18} />} active={activeTab === 'profile'} />
              <NavItem id="account" label="Account Security" icon={<Lock size={18} />} active={activeTab === 'account'} />
              <NavItem id="notifications" label="Notifications" icon={<Bell size={18} />} active={activeTab === 'notifications'} />
              <NavItem id="privacy" label="Privacy" icon={<Shield size={18} />} active={activeTab === 'privacy'} />
              <NavItem id="appearance" label="Appearance" icon={<Palette size={18} />} active={activeTab === 'appearance'} />
            </div>
            
            <div className="border-t border-gray-100 mt-2 p-3">
              <Card className="border border-red-100 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Trash2 className="h-6 w-6 text-red-500 mb-2" />
                    <h3 className="font-semibold text-red-700">Delete Account</h3>
                    <p className="text-xs text-red-600 mt-1 mb-3">This action is irreversible.</p>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => toast.error("Account deletion is currently disabled.")}
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="profile" className="m-0">
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and how you appear on the platform.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
                      <div className="flex flex-col items-center">
                        <Avatar className="w-24 h-24 border-2 border-gray-200 mb-4">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`} />
                          <AvatarFallback className="text-xl bg-primary text-white">
                            {userData.firstName?.charAt(0) || '?'}{userData.lastName?.charAt(0) || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="mb-2">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                        <p className="text-xs text-gray-500">JPG, PNG. Max 2MB</p>
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
                            className="bg-gray-100"
                          />
                          <p className="text-xs text-gray-500">Contact support to change your email address.</p>
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input 
                            id="experience"
                            name="experience"
                            value={userData.experience}
                            onChange={handleInputChange}
                            placeholder="e.g. 5"
                            className="transition-shadow focus:shadow-md"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="education">Highest Education</Label>
                          <Input 
                            id="education"
                            name="education"
                            value={userData.education}
                            onChange={handleInputChange}
                            placeholder="e.g. Master's Degree"
                            className="transition-shadow focus:shadow-md"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio"
                          name="bio"
                          value={userData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself and your career goals..."
                          className="min-h-[120px] transition-shadow focus:shadow-md"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg px-6"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              
              <TabsContent value="appearance" className="m-0">
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how CareerMatchAI looks for you.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Theme Preference</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ThemeCard 
                          theme="light" 
                          label="Light"
                          current={userData.theme} 
                          onClick={() => handleSelectChange('theme', 'light')} 
                        />
                        <ThemeCard 
                          theme="dark" 
                          label="Dark"
                          current={userData.theme} 
                          onClick={() => handleSelectChange('theme', 'dark')} 
                        />
                        <ThemeCard 
                          theme="system" 
                          label="System"
                          current={userData.theme} 
                          onClick={() => handleSelectChange('theme', 'system')} 
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Appearance'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              
              <TabsContent value="account" className="m-0">
                
                <Card className="border-0 shadow-sm bg-white">
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
                    
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <h3 className="font-medium text-amber-800 mb-2">Password Requirements</h3>
                      <ul className="space-y-1 text-sm text-amber-700 list-disc list-inside">
                        <li>At least 8 characters long</li>
                        <li>Include at least one uppercase letter</li>
                        <li>Include at least one number</li>
                        <li>Include at least one special character</li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-lg mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable 2FA</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch 
                          onCheckedChange={() => toast.info("Two-factor authentication setup coming soon")}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                        onClick={() => toast.info("Password change functionality coming soon")}
                      >
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                
                <Card className="border-0 shadow-sm bg-white">
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
                    
                    <div className="flex justify-end">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="m-0">
                
                <Card className="border-0 shadow-sm bg-white">
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
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Your Data Rights</h3>
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
                    
                    <div className="flex justify-end">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                        onClick={() => toast.success("Privacy settings saved")}
                      >
                        Save Privacy Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
