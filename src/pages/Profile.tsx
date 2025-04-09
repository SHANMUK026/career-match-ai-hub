
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, GraduationCap, Calendar, FileText, Award, PenTool, User, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: 'Thomas',
    lastName: 'Anderson',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    email: 'thomas@example.com',
    bio: 'Passionate software engineer with 8+ years of experience in full-stack development. Skilled in React, Node.js, and cloud technologies. Always eager to learn and tackle new challenges.',
    experience: '8',
    education: 'M.S. Computer Science',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'Python', 'Docker'],
    achievements: ['Led team of 5 engineers for enterprise platform', 'Reduced load time by 40%', 'Speaker at React Conference 2023'],
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfileData = async () => {
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
        
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        if (data) {
          // Map database fields to our state
          setProfile(prevProfile => ({
            ...prevProfile,
            firstName: data.first_name || prevProfile.firstName,
            lastName: data.last_name || prevProfile.lastName,
            email: session.user.email || prevProfile.email,
            // Add other fields from your database
          }));
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [navigate]);

  const handleEditProfile = () => {
    navigate('/settings');
    toast.info("Redirecting to profile settings");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 animate-fade-in">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <div className="px-8 pb-8 relative">
              <div className="-mt-16 flex flex-col md:flex-row items-start md:items-end gap-6">
                <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.firstName} ${profile.lastName}`} alt={`${profile.firstName} ${profile.lastName}`} />
                  <AvatarFallback className="text-3xl bg-primary text-white">{profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800">{profile.firstName} {profile.lastName}</h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-gray-600">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-primary" />
                      <span>{profile.title}</span>
                    </div>
                    <div className="hidden sm:block text-gray-300">•</div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-primary" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleEditProfile}
                  className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm shadow-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills & Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="flex flex-col items-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                    <div className="p-3 rounded-full bg-blue-100 mb-3">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
                    <p className="text-3xl font-bold text-primary">{profile.experience}+ <span className="text-sm font-normal text-gray-500">years</span></p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                    <div className="p-3 rounded-full bg-green-100 mb-3">
                      <GraduationCap className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                    <p className="text-xl font-bold text-primary">{profile.education}</p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                    <div className="p-3 rounded-full bg-purple-100 mb-3">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Applications</h3>
                    <p className="text-3xl font-bold text-primary">12 <span className="text-sm font-normal text-gray-500">active</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Upcoming Interviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">Frontend Developer Interview</h3>
                        <p className="text-sm text-gray-600">TechCorp Inc. • April 12, 2025</p>
                      </div>
                      <Badge className="bg-blue-500">10:00 AM</Badge>
                    </div>
                    <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-r-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">Technical Assessment</h3>
                        <p className="text-sm text-gray-600">InnovateTech • April 15, 2025</p>
                      </div>
                      <Badge className="bg-gray-500">2:30 PM</Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    onClick={() => navigate('/mock-interview')}
                  >
                    Prepare for Interviews
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Profile Strength
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Overall Strength</span>
                      <span className="text-sm font-bold text-primary">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-blue-500 to-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Resume Completeness</span>
                      <Badge className="bg-green-500">Complete</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Skills Assessment</span>
                      <Badge className="bg-yellow-500">3 of 5</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Mock Interviews</span>
                      <Badge className="bg-red-500">1 of 3</Badge>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-primary-gradient hover:opacity-90 text-white transition-all"
                    onClick={() => navigate('/assessments')}
                  >
                    Complete Assessments
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="experience" className="mt-0 space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative border-l-2 border-primary pl-6 pb-2">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="text-xl font-semibold text-gray-800">Senior Software Engineer</h3>
                  <p className="text-primary font-medium">TechCorp Inc.</p>
                  <p className="text-gray-600 text-sm">Jan 2022 - Present • 3 years</p>
                  <p className="mt-2 text-gray-700">Led development of microservices architecture for customer-facing applications. Mentored junior developers and implemented CI/CD pipelines.</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">React</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">TypeScript</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Node.js</Badge>
                  </div>
                </div>
                
                <div className="relative border-l-2 border-gray-300 pl-6 pb-2">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                  <h3 className="text-xl font-semibold text-gray-800">Software Engineer</h3>
                  <p className="text-primary font-medium">InnovateTech</p>
                  <p className="text-gray-600 text-sm">Mar 2019 - Dec 2021 • 2 years, 9 months</p>
                  <p className="mt-2 text-gray-700">Developed and maintained customer-facing web applications. Improved performance of legacy systems and implemented new features.</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">JavaScript</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">React</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">GraphQL</Badge>
                  </div>
                </div>
                
                <div className="relative border-l-2 border-gray-300 pl-6">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                  <h3 className="text-xl font-semibold text-gray-800">Junior Developer</h3>
                  <p className="text-primary font-medium">StartupNow</p>
                  <p className="text-gray-600 text-sm">Jun 2017 - Feb 2019 • 1 year, 8 months</p>
                  <p className="mt-2 text-gray-700">Worked on frontend development for e-commerce platforms. Collaborated with design team to implement UI/UX improvements.</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">HTML/CSS</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">JavaScript</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">jQuery</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative border-l-2 border-primary pl-6 pb-2">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="text-xl font-semibold text-gray-800">M.S. Computer Science</h3>
                  <p className="text-primary font-medium">Stanford University</p>
                  <p className="text-gray-600 text-sm">2015 - 2017</p>
                  <p className="mt-2 text-gray-700">Specialized in Artificial Intelligence and Machine Learning. Thesis on predictive models for user behavior.</p>
                </div>
                
                <div className="relative border-l-2 border-gray-300 pl-6">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                  <h3 className="text-xl font-semibold text-gray-800">B.S. Computer Engineering</h3>
                  <p className="text-primary font-medium">University of California, Berkeley</p>
                  <p className="text-gray-600 text-sm">2011 - 2015</p>
                  <p className="mt-2 text-gray-700">Graduated with honors. Participated in hackathons and coding competitions. Member of the Computer Science Club.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="mt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PenTool className="mr-2 h-5 w-5 text-primary" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 text-primary border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all px-3 py-1 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Frontend Development</span>
                      <span className="text-sm font-medium text-gray-700">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Backend Development</span>
                      <span className="text-sm font-medium text-gray-700">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">DevOps & Cloud</span>
                      <span className="text-sm font-medium text-gray-700">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">UI/UX Design</span>
                      <span className="text-sm font-medium text-gray-700">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  onClick={() => navigate('/assessments')}
                >
                  Take Skills Assessment
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {profile.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                        <Award className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Certifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">AWS Solutions Architect</span>
                      <span className="text-gray-500 text-sm">2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Google Cloud Professional</span>
                      <span className="text-gray-500 text-sm">2022</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">React Advanced Patterns</span>
                      <span className="text-gray-500 text-sm">2021</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
