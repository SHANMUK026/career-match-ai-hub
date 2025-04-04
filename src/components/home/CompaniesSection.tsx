
import React from 'react';

const CompaniesSection = () => {
  const companies = [
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
          Trusted by Leading Companies
        </h2>
        <div className="flex flex-wrap justify-center items-center">
          <div className="flex flex-nowrap overflow-hidden w-full">
            <div className="flex space-x-12 animate-[scroll_25s_linear_infinite]">
              {companies.map((company, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center h-16 w-40 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-8 object-contain"
                  />
                </div>
              ))}
              {companies.map((company, index) => (
                <div 
                  key={`dup-${index}`} 
                  className="flex items-center justify-center h-16 w-40 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-8 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
