
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      (_event, session) => {
        setSession(session);
      }
    );

    // Check for an existing session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
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

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white bg-opacity-95 py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-poppins font-bold text-primary">
            CareerMatchAI
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`transition-colors hover:text-primary ${isActive('/') ? 'text-primary font-medium' : 'text-gray-600'}`}>
            Home
          </Link>
          <Link to="/jobs" className={`transition-colors hover:text-primary ${isActive('/jobs') ? 'text-primary font-medium' : 'text-gray-600'}`}>
            Jobs
          </Link>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center transition-colors hover:text-primary ${
                isActive('/assessments') || isActive('/mock-interview') || isActive('/smart-interview') 
                  ? 'text-primary font-medium' 
                  : 'text-gray-600'
              }`}
            >
              Assessments <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
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
          <Link to="/employers" className={`transition-colors hover:text-primary ${isActive('/employers') ? 'text-primary font-medium' : 'text-gray-600'}`}>
            Employers
          </Link>
          <Link to="/contact" className={`transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary font-medium' : 'text-gray-600'}`}>
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <Button variant="outline" onClick={handleDashboard} className="rounded-md">
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button onClick={handleLogout} className="bg-primary-gradient rounded-md">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="rounded-md" onClick={handleLogin}>
                Login
              </Button>
              <Button className="bg-primary-gradient rounded-md" onClick={handleSignUp}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
            </nav>

            <div className="flex flex-col space-y-3">
              {session ? (
                <>
                  <Button variant="outline" onClick={handleDashboard} className="w-full justify-center">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button onClick={handleLogout} className="w-full justify-center bg-primary-gradient">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-center" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button className="w-full justify-center bg-primary-gradient" onClick={handleSignUp}>
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
