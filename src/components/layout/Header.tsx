
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
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
          <Link to="/" className="nav-link-active">
            Home
          </Link>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
          <Link to="/employers" className="nav-link">
            Employers
          </Link>
          <Link to="/assessments" className="nav-link">
            Assessments
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="rounded-md" onClick={handleLogin}>
            Login
          </Button>
          <Button className="bg-primary-gradient rounded-md" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <nav className="flex flex-col space-y-4 mb-6">
              <Link to="/" className="nav-link-active py-2">
                Home
              </Link>
              <Link to="/jobs" className="nav-link py-2">
                Jobs
              </Link>
              <Link to="/employers" className="nav-link py-2">
                Employers
              </Link>
              <Link to="/assessments" className="nav-link py-2">
                Assessments
              </Link>
              <Link to="/contact" className="nav-link py-2">
                Contact
              </Link>
            </nav>

            <div className="flex flex-col space-y-3">
              <Button variant="outline" className="w-full justify-center" onClick={handleLogin}>
                Login
              </Button>
              <Button className="w-full justify-center bg-primary-gradient" onClick={handleSignUp}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
