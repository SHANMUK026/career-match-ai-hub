
import React from 'react';

const CompaniesSection = () => {
  const companies = [
    { name: 'Microsoft', logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
    { name: 'Google', logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
    { name: 'Apple', logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
    { name: 'Amazon', logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
    { name: 'Facebook', logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
    { name: 'Netflix', logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' },
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
