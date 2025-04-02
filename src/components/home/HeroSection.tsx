
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-hero-gradient min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 hero-text-shadow leading-tight">
              Your Dream Job, <br/>
              <span className="text-gradient">Just One Click Away!</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              AI-driven job matching and assessments for the perfect career fit. Find opportunities that truly align with your skills and goals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="btn-primary flex items-center justify-center group">
                Find Jobs
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button variant="outline" className="btn-secondary">
                Hire Talent
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[500px]">
              <div className="absolute top-0 left-0 w-full h-full bg-white/20 backdrop-blur-sm rounded-xl rotate-3 transform-gpu"></div>
              <div className="absolute top-5 left-5 w-full h-full bg-primary/5 rounded-xl -rotate-2 transform-gpu"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-xl shadow-xl flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Career professional" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
