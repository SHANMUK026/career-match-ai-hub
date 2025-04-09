
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, SearchCheck, ChevronRight, Award, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Add framer-motion as a dependency
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

const HeroSection = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    // Start stats animation after a delay
    const timer = setTimeout(() => {
      setAnimateStats(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleFindJobs = () => {
    navigate('/jobs');
    toast.success("Exploring job opportunities", {
      description: "Discover top matches for your skills",
      action: {
        label: "View all jobs",
        onClick: () => navigate('/jobs')
      }
    });
  };

  const handleHireTalent = () => {
    navigate('/employers');
    toast.success("Exploring talent hiring options", {
      description: "Find the perfect candidates for your team",
      action: {
        label: "Post a job",
        onClick: () => navigate('/jobs/post')
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="pt-32 pb-20 overflow-hidden relative bg-gradient-to-b from-gray-50 via-blue-50/30 to-purple-50/20 min-h-screen">
      {/* Blob decorations */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 blur-3xl -z-10" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-indigo-100/40 to-pink-100/40 blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.div
              className="inline-block mb-3 px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 font-medium text-sm border border-blue-200/50 shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <span className="flex items-center">
                <Award className="mr-1.5 h-4 w-4" />
                AI-Powered Career Matching Platform
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Dream Career</span> <br />
              <span className="relative">
                With Perfect Match
                <span className="absolute bottom-2 left-0 w-full h-2 bg-gradient-to-r from-blue-200/70 to-violet-200/70 -z-10 transform -rotate-1"></span>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg"
              variants={itemVariants}
            >
              Discover opportunities that truly align with your skills and goals through our AI-driven matching and assessment platform.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all py-6 px-8 text-lg flex items-center justify-center group rounded-xl"
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
                className="bg-white/80 backdrop-blur-sm border-2 border-primary text-primary hover:bg-primary/5 shadow-md hover:shadow-lg transition-all py-6 px-8 text-lg rounded-xl"
                onClick={handleHireTalent}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Hire Talent
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden lg:block relative"
            variants={itemVariants}
          >
            <div className="relative w-full h-[550px]">
              <motion.div 
                className="absolute top-0 right-5 w-full h-full bg-gradient-to-r from-blue-200/30 to-purple-200/30 backdrop-blur-sm rounded-xl rotate-3 transform-gpu"
                initial={{ rotate: 3, scale: 0.95, opacity: 0 }}
                animate={{ rotate: 3, scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
              <motion.div 
                className="absolute top-5 right-0 w-full h-full bg-primary/5 rounded-xl -rotate-2 transform-gpu"
                initial={{ rotate: -2, scale: 0.95, opacity: 0 }}
                animate={{ rotate: -2, scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              />
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-white rounded-xl shadow-2xl flex items-center justify-center overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Career professional" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-center justify-end p-8">
                  <motion.div 
                    className="bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg max-w-xs"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                        95%
                      </div>
                      <div className="ml-3">
                        <h3 className="font-bold text-gray-900">Match Score</h3>
                        <p className="text-sm text-gray-600">Perfect role for your skills</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full mb-2">
                      <motion.div 
                        className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 1, delay: 1.1 }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">93% Success Rate</p>
                  <p className="text-sm text-gray-600">Job placement within 30 days</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          variants={statsVariants}
          initial="hidden"
          animate={animateStats ? "visible" : "hidden"}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-blue-100/50"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">10K+</div>
            <div className="text-gray-600">Jobs Posted</div>
          </motion.div>
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-blue-100/50"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">8K+</div>
            <div className="text-gray-600">Successful Hires</div>
          </motion.div>
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-blue-100/50"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">95%</div>
            <div className="text-gray-600">Placement Rate</div>
          </motion.div>
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-blue-100/50"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">250+</div>
            <div className="text-gray-600">Partner Companies</div>
          </motion.div>
        </motion.div>
        
        <div className="mt-12 flex justify-center">
          <Button 
            variant="ghost" 
            className="text-primary group flex items-center"
            onClick={() => {
              const element = document.getElementById('how-it-works');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Learn how it works
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
