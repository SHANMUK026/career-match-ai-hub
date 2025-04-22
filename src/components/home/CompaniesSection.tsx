
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  HoverCard, 
  HoverCardTrigger, 
  HoverCardContent 
} from '@/components/ui/hover-card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Briefcase, ChevronRight, Building2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const CompaniesSection = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const companies = [
    { 
      name: 'Microsoft', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      description: 'A multinational technology company developing software, hardware, and related services',
      jobCount: 42,
      industry: 'Technology',
      path: '/employers',
      employees: '180,000+',
      founded: '1975'
    },
    { 
      name: 'Google', 
      logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      description: 'A global technology leader focused on search, cloud computing, and online advertising',
      jobCount: 38,
      industry: 'Technology',
      path: '/employers',
      employees: '150,000+',
      founded: '1998'
    },
    { 
      name: 'Apple', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      description: 'An innovative technology company known for premium hardware, software, and services',
      jobCount: 29,
      industry: 'Technology',
      path: '/employers',
      employees: '160,000+',
      founded: '1976'
    },
    { 
      name: 'Amazon', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      description: 'A multinational technology company focusing on e-commerce, cloud computing, and AI',
      jobCount: 57,
      industry: 'E-commerce/Technology',
      path: '/employers',
      employees: '1,500,000+',
      founded: '1994'
    },
    { 
      name: 'Meta', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
      description: 'A social technology company building connections through social media and virtual reality',
      jobCount: 24,
      industry: 'Social Media/Technology',
      path: '/employers',
      employees: '75,000+',
      founded: '2004'
    },
    { 
      name: 'Netflix', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png',
      description: 'A global streaming entertainment service offering movies, TV shows, and original content',
      jobCount: 18,
      industry: 'Entertainment/Technology',
      path: '/employers',
      employees: '12,000+',
      founded: '1997'
    },
    { 
      name: 'IBM', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      description: 'A leading technology and consulting company specializing in AI, cloud, and quantum computing',
      jobCount: 34,
      industry: 'Technology/Consulting',
      path: '/employers',
      employees: '280,000+',
      founded: '1911'
    },
    { 
      name: 'Tesla', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      description: 'An electric vehicle and clean energy company revolutionizing transportation',
      jobCount: 26,
      industry: 'Automotive/Energy',
      path: '/employers',
      employees: '100,000+',
      founded: '2003'
    }
  ];

  useEffect(() => {
    // Auto-rotate featured companies
    const interval = setInterval(() => {
      setActiveIndex((prev) => 
        prev === null || prev >= companies.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [companies.length]);

  const handleCompanyClick = (company: typeof companies[0]) => {
    navigate(`/employers?company=${encodeURIComponent(company.name)}`);
    toast.success(`Viewing ${company.name} profile`, {
      description: `Exploring ${company.jobCount} open positions`
    });
  };

  const handlePostJob = () => {
    navigate('/jobs/post');
    toast.success('Ready to post a job', {
      description: 'Create your job listing to find the perfect candidate'
    });
  };

  const handleBrowseCompanies = () => {
    navigate('/employers');
    toast.success('Browsing all companies', {
      description: 'Discover top employers from various industries'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-3 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Top Employers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Trusted by Leading Companies
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of top companies that rely on our platform to find and hire exceptional talent
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {companies.map((company, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`relative ${activeIndex === index ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900' : ''}`}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div 
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-32"
                    onClick={() => handleCompanyClick(company)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className="h-16 flex items-center justify-center mb-3 transition-all duration-300">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="h-10 object-contain filter dark:invert-[.25] dark:brightness-125"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff&size=128`;
                        }}
                      />
                    </div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-center">{company.name}</p>
                    <span className="text-xs text-blue-600 dark:text-blue-400 mt-1">{company.jobCount} jobs</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-0 shadow-lg">
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-16 flex items-center justify-center p-4">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="h-8 max-w-[140px] object-contain filter brightness-0 invert"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff&size=128`;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{company.name}</h4>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                          {company.industry}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{company.description}</p>
                      
                      <div className="flex space-x-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Building2 className="h-4 w-4 mr-1" />
                          <span>Founded {company.founded}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{company.employees}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded mt-2">
                        <p className="text-sm font-medium text-primary flex items-center justify-between">
                          <span>{company.jobCount} open positions</span>
                          <ChevronRight className="h-4 w-4" />
                        </p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 w-full"
                        onClick={() => handleCompanyClick(company)}
                      >
                        View Company Profile
                      </Button>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join over 10,000 companies posting jobs on our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-primary-gradient hover:shadow-lg transition-shadow text-white px-6 py-6 rounded-md flex items-center justify-center"
              onClick={handlePostJob}
            >
              <Briefcase className="mr-2 h-5 w-5" />
              <span className="text-base">Post a Job</span>
            </Button>
            <Button 
              variant="outline"
              className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-6 rounded-md"
              onClick={handleBrowseCompanies}
            >
              <Building2 className="mr-2 h-5 w-5" />
              <span className="text-base">Browse All Companies</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompaniesSection;
