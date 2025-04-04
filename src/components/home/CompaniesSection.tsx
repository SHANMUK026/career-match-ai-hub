
import React from 'react';
import { Button } from '@/components/ui/button';

const CompaniesSection = () => {
  const companies = [
    { 
      name: 'Microsoft', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      description: 'A multinational technology company developing software, hardware, and related services'
    },
    { 
      name: 'Google', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
      description: 'A global technology leader focused on search, cloud computing, and online advertising'
    },
    { 
      name: 'Apple', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      description: 'An innovative technology company known for premium hardware, software, and services'
    },
    { 
      name: 'Amazon', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      description: 'A multinational technology company focusing on e-commerce, cloud computing, and AI'
    },
    { 
      name: 'Meta', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
      description: 'A social technology company building connections through social media and virtual reality'
    },
    { 
      name: 'Netflix', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png',
      description: 'A global streaming entertainment service offering movies, TV shows, and original content'
    },
    { 
      name: 'IBM', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      description: 'A leading technology and consulting company specializing in AI, cloud, and quantum computing'
    },
    { 
      name: 'Oracle', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
      description: 'A multinational computer technology corporation specializing in database software and cloud systems'
    }
  ];

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
            <div 
              key={index} 
              className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div className="h-16 w-40 flex items-center justify-center mb-3 grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-8 object-contain"
                />
              </div>
              <p className="text-sm text-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">{company.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Join over 10,000 companies posting jobs on our platform
          </p>
          <Button className="bg-primary-gradient">
            Post a Job
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
