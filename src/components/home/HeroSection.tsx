
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, SearchCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleFindJobs = () => {
    navigate('/jobs');
    toast.success("Exploring job opportunities");
  };

  const handleHireTalent = () => {
    navigate('/employers');
    toast.success("Exploring talent hiring options");
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-block mb-3 px-4 py-1.5 bg-blue-100 rounded-full text-blue-700 font-medium text-sm">
              AI-Powered Career Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Dream Career</span> <br />
              With Perfect Match
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Discover opportunities that truly align with your skills and goals through our AI-driven matching and assessment platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all py-6 px-8 text-lg flex items-center justify-center group"
                onClick={handleFindJobs}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <SearchCheck className="mr-2 h-5 w-5" />
                Find Jobs
                <ArrowRight className={`ml-2 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} size={20} />
              </Button>
              <Button 
                variant="outline" 
                className="bg-white border-2 border-primary text-primary hover:bg-primary/5 shadow-md hover:shadow-lg transition-all py-6 px-8 text-lg"
                onClick={handleHireTalent}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Hire Talent
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[550px]">
              <div className="absolute top-0 right-5 w-full h-full bg-gradient-to-r from-blue-200/30 to-purple-200/30 backdrop-blur-sm rounded-xl rotate-3 transform-gpu"></div>
              <div className="absolute top-5 right-0 w-full h-full bg-primary/5 rounded-xl -rotate-2 transform-gpu"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Career professional" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col items-center justify-end p-8">
                  <div className="bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg max-w-xs">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 flex items-center justify-center text-white font-bold text-xl">
                        95%
                      </div>
                      <div className="ml-3">
                        <h3 className="font-bold text-gray-900">Match Score</h3>
                        <p className="text-sm text-gray-600">Perfect role for your skills</p>
                      </div>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full mb-2">
                      <div className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 w-[95%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-lg shadow-xl animate-pulse">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">93% Success Rate</p>
                  <p className="text-sm text-gray-600">Job placement within 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary mb-1">10K+</div>
            <div className="text-gray-600">Jobs Posted</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary mb-1">8K+</div>
            <div className="text-gray-600">Successful Hires</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary mb-1">95%</div>
            <div className="text-gray-600">Placement Rate</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary mb-1">250+</div>
            <div className="text-gray-600">Partner Companies</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
