
import React from 'react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CompaniesSection = () => {
  const navigate = useNavigate();
  const companies = [
    { 
      name: 'Microsoft', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      description: 'A multinational technology company developing software, hardware, and related services',
      jobCount: 42,
      industry: 'Technology',
      path: '/employers'
    },
    { 
      name: 'Google', 
      logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      description: 'A global technology leader focused on search, cloud computing, and online advertising',
      jobCount: 38,
      industry: 'Technology',
      path: '/employers'
    },
    { 
      name: 'Apple', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      description: 'An innovative technology company known for premium hardware, software, and services',
      jobCount: 29,
      industry: 'Technology',
      path: '/employers'
    },
    { 
      name: 'Amazon', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      description: 'A multinational technology company focusing on e-commerce, cloud computing, and AI',
      jobCount: 57,
      industry: 'E-commerce/Technology',
      path: '/employers'
    },
    { 
      name: 'Meta', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
      description: 'A social technology company building connections through social media and virtual reality',
      jobCount: 24,
      industry: 'Social Media/Technology',
      path: '/employers'
    },
    { 
      name: 'Netflix', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png',
      description: 'A global streaming entertainment service offering movies, TV shows, and original content',
      jobCount: 18,
      industry: 'Entertainment/Technology',
      path: '/employers'
    },
    { 
      name: 'IBM', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      description: 'A leading technology and consulting company specializing in AI, cloud, and quantum computing',
      jobCount: 34,
      industry: 'Technology/Consulting',
      path: '/employers'
    },
    { 
      name: 'Tesla', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      description: 'An electric vehicle and clean energy company revolutionizing transportation',
      jobCount: 26,
      industry: 'Automotive/Energy',
      path: '/employers'
    }
  ];

  const handleCompanyClick = (company: typeof companies[0]) => {
    navigate(`/employers?company=${company.name}`);
    toast.success(`Viewing ${company.name} profile`);
  };

  const handlePostJob = () => {
    navigate('/jobs/post');
    toast.success('Navigating to Post a Job page');
  };

  const handleBrowseCompanies = () => {
    navigate('/employers');
    toast.success('Browsing all companies');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of top companies that rely on our platform to find and hire exceptional talent
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {companies.map((company, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <div 
                  className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => handleCompanyClick(company)}
                >
                  <div className="h-16 w-40 flex items-center justify-center mb-3 grayscale hover:grayscale-0 transition-all duration-300">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="h-10 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://via.placeholder.com/150?text=${company.name}`;
                      }}
                    />
                  </div>
                  <p className="font-medium text-gray-800">{company.name}</p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="max-h-full" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `https://via.placeholder.com/150?text=${company.name}`;
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{company.name}</h4>
                      <p className="text-sm text-gray-500">{company.industry}</p>
                    </div>
                  </div>
                  <p className="text-sm">{company.description}</p>
                  <div className="bg-gray-50 p-2 rounded mt-2">
                    <p className="text-sm font-medium text-primary">{company.jobCount} open positions</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={() => handleCompanyClick(company)}
                  >
                    View Company Profile
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Join over 10,000 companies posting jobs on our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-primary-gradient"
              onClick={handlePostJob}
            >
              Post a Job
            </Button>
            <Button 
              variant="outline"
              onClick={handleBrowseCompanies}
            >
              Browse All Companies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
