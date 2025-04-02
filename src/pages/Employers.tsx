
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Search, BriefcaseBusiness, MapPin } from 'lucide-react';

const Employers = () => {
  // Sample employers data
  const employers = [
    {
      id: 1,
      name: 'TechCorp',
      industry: 'Technology',
      location: 'San Francisco, CA',
      description: 'Leading innovator in software development',
      openPositions: 12,
      logo: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      name: 'InnovateNow',
      industry: 'Product Design',
      location: 'Remote',
      description: 'Creating tomorrow\'s design solutions',
      openPositions: 5,
      logo: 'https://via.placeholder.com/100'
    },
    {
      id: 3,
      name: 'Analytics Pro',
      industry: 'Data Science',
      location: 'New York, NY',
      description: 'Data-driven business intelligence solutions',
      openPositions: 8,
      logo: 'https://via.placeholder.com/100'
    },
    {
      id: 4,
      name: 'DesignHub',
      industry: 'UX/UI Design',
      location: 'Austin, TX',
      description: 'Award-winning design agency',
      openPositions: 3,
      logo: 'https://via.placeholder.com/100'
    },
    {
      id: 5,
      name: 'CloudScale',
      industry: 'Cloud Infrastructure',
      location: 'Seattle, WA',
      description: 'Enterprise cloud solutions provider',
      openPositions: 10,
      logo: 'https://via.placeholder.com/100'
    },
    {
      id: 6,
      name: 'GrowthGenius',
      industry: 'Marketing',
      location: 'Chicago, IL',
      description: 'Results-driven marketing campaigns',
      openPositions: 4,
      logo: 'https://via.placeholder.com/100'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find The Perfect Talent</h1>
            <p className="text-gray-600">Connect with thousands of qualified candidates for your open positions</p>
          </div>
          
          {/* Search */}
          <div className="mb-8 relative max-w-2xl">
            <input
              type="text"
              placeholder="Search for talent..."
              className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <Button className="absolute right-2 top-2 bg-primary-gradient">
              Search
            </Button>
          </div>
          
          {/* Main content */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Popular Employers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employers.map(employer => (
                <div key={employer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img src={employer.logo} alt={employer.name} className="w-16 h-16 object-cover rounded-full mr-4" />
                      <div>
                        <h3 className="font-semibold text-xl text-primary">{employer.name}</h3>
                        <p className="text-gray-600">{employer.industry}</p>
                      </div>
                    </div>
                    
                    <p className="mb-4 text-gray-700">{employer.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {employer.location}
                      </div>
                      <div className="flex items-center">
                        <BriefcaseBusiness size={16} className="mr-1" />
                        {employer.openPositions} open positions
                      </div>
                    </div>
                    
                    <Button className="w-full bg-primary-gradient">View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Perfect Candidates?</h2>
              <p className="mb-6 text-white/80">Post a job today and get matched with qualified candidates through our AI-driven platform.</p>
              <Button className="bg-white text-primary hover:bg-gray-100 transition-colors">Post a Job</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Employers;
