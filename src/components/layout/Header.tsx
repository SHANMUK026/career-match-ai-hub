
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, ChevronDown, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState<{ firstName?: string; lastName?: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on navigation
    setIsMenuOpen(false);
    // Close dropdown on navigation
    setIsDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        
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
        } else {
          setProfileData(null);
        }
      }
    );

    // Check for an existing session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session?.user?.id) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileData) {
          setProfileData({ 
            firstName: profileData.first_name,
            lastName: profileData.last_name
          });
        }
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getInitials = () => {
    if (profileData?.firstName && profileData?.lastName) {
      return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
    }
    return "U";
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white bg-opacity-95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="text-2xl font-poppins font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600"
          >
            CareerMatchAI
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`transition-all hover:text-primary ${isActive('/') ? 'text-primary font-medium' : 'text-gray-600'}`}>
            Home
          </Link>
          <Link to="/jobs" className={`transition-all hover:text-primary ${isActive('/jobs') ? 'text-primary font-medium' : 'text-gray-600'}`}>
            Jobs
          </Link>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center transition-all hover:text-primary ${
                isActive('/assessments') || isActive('/mock-interview') || isActive('/smart-interview') 
                  ? 'text-primary font-medium' 
                  : 'text-gray-600'
              }`}
            >
              Assessments <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 animate-fade-in">
                <div className="py-1">
                  <Link 
                    to="/assessments" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    All Assessments
                  </Link>
                  <Link 
                    to="/mock-interview" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Mock Interviews
                  </Link>
                  <Link 
                    to="/smart-interview" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Smart AI Interviews
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link to="/employers" className={`transition-all hover:text-primary ${isActive('/employers') ? 'text-primary font-medium' : 'text-gray-600'}`}>
            Employers
          </Link>
          <Link to="/contact" className={`transition-all hover:text-primary ${isActive('/contact') ? 'text-primary font-medium' : 'text-gray-600'}`}>
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-3">
              <NotificationCenter />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-10 w-10 p-0 overflow-hidden border border-gray-200 hover:bg-gray-100 hover:text-primary">
                    <Avatar className="h-9 w-9">
                      <AvatarImage 
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials()}`} 
                        alt="Profile" 
                      />
                      <AvatarFallback className="bg-primary text-white">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-fade-in">
                  <DropdownMenuLabel>
                    {profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}` : 'My Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDashboard} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="rounded-md border-primary text-primary hover:bg-primary/5 transition-all duration-300" 
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300" 
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {session && (
            <>
              <NotificationCenter />
              <Button 
                variant="ghost" 
                className="relative rounded-full h-9 w-9 p-0 overflow-hidden mr-1"
                onClick={handleProfile}
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage 
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials()}`} 
                    alt="Profile" 
                  />
                  <AvatarFallback className="bg-primary text-white">{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </>
          )}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 p-1 rounded-md hover:bg-gray-100"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <nav className="flex flex-col space-y-4 mb-6">
              <Link to="/" className={`py-2 ${isActive('/') ? 'text-primary font-medium' : 'text-gray-600'}`}>
                Home
              </Link>
              <Link to="/jobs" className={`py-2 ${isActive('/jobs') ? 'text-primary font-medium' : 'text-gray-600'}`}>
                Jobs
              </Link>
              
              <div>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center w-full py-2 justify-between ${
                    isActive('/assessments') || isActive('/mock-interview') || isActive('/smart-interview') 
                      ? 'text-primary font-medium' 
                      : 'text-gray-600'
                  }`}
                >
                  Assessments <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
                    <Link 
                      to="/assessments" 
                      className="block py-2 text-sm text-gray-700"
                    >
                      All Assessments
                    </Link>
                    <Link 
                      to="/mock-interview" 
                      className="block py-2 text-sm text-gray-700"
                    >
                      Mock Interviews
                    </Link>
                    <Link 
                      to="/smart-interview" 
                      className="block py-2 text-sm text-gray-700"
                    >
                      Smart AI Interviews
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/employers" className={`py-2 ${isActive('/employers') ? 'text-primary font-medium' : 'text-gray-600'}`}>
                Employers
              </Link>
              <Link to="/contact" className={`py-2 ${isActive('/contact') ? 'text-primary font-medium' : 'text-gray-600'}`}>
                Contact
              </Link>
              
              {session && (
                <>
                  <Link to="/dashboard" className={`py-2 ${isActive('/dashboard') ? 'text-primary font-medium' : 'text-gray-600'}`}>
                    Dashboard
                  </Link>
                  <Link to="/profile" className={`py-2 ${isActive('/profile') ? 'text-primary font-medium' : 'text-gray-600'}`}>
                    My Profile
                  </Link>
                  <Link to="/settings" className={`py-2 ${isActive('/settings') ? 'text-primary font-medium' : 'text-gray-600'}`}>
                    Settings
                  </Link>
                </>
              )}
            </nav>

            <div className="flex flex-col space-y-3">
              {session ? (
                <Button 
                  onClick={handleLogout} 
                  className="w-full justify-center bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center border-primary text-primary hover:bg-primary/5 transition-all"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full justify-center bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
