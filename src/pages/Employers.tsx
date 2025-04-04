
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Search, BriefcaseBusiness, MapPin, Star, Users, ChevronRight, Building } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Employers = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample employers data with improved logos and more information
  const employers = [
    {
      id: 1,
      name: 'Google',
      industry: 'Technology',
      location: 'Mountain View, CA',
      description: 'Leading innovator in search, cloud computing, and AI technologies',
      openPositions: 14,
      rating: 4.8,
      employees: '150,000+',
      logo: '/lovable-uploads/31ce572b-2495-4b45-b3be-98807cf283d8.png',
      color: 'bg-blue-50'
    },
    {
      id: 2,
      name: 'Microsoft',
      industry: 'Software & Cloud',
      location: 'Redmond, WA',
      description: 'Global leader in software, cloud services and hardware devices',
      openPositions: 8,
      rating: 4.6,
      employees: '180,000+',
      logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
      color: 'bg-indigo-50'
    },
    {
      id: 3,
      name: 'Amazon',
      industry: 'E-Commerce & Cloud',
      location: 'Seattle, WA',
      description: 'The world\'s largest online marketplace and cloud services provider',
      openPositions: 20,
      rating: 4.2,
      employees: '1,500,000+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
      color: 'bg-amber-50'
    },
    {
      id: 4,
      name: 'Meta',
      industry: 'Social Media',
      location: 'Menlo Park, CA',
      description: 'Building technologies that help people connect and businesses grow',
      openPositions: 6,
      rating: 4.1,
      employees: '70,000+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png',
      color: 'bg-blue-50'
    },
    {
      id: 5,
      name: 'Apple',
      industry: 'Hardware & Software',
      location: 'Cupertino, CA',
      description: 'Innovative technology company creating products that define categories',
      openPositions: 10,
      rating: 4.7,
      employees: '160,000+',
      logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
      color: 'bg-gray-50'
    },
    {
      id: 6,
      name: 'Netflix',
      industry: 'Entertainment',
      location: 'Los Gatos, CA',
      description: 'Leading streaming entertainment service company',
      openPositions: 4,
      rating: 4.5,
      employees: '12,000+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
      color: 'bg-red-50'
    }
  ];

  const filterCompanies = (filter: string) => {
    setActiveFilter(filter);
    // In a real app, this would filter the companies based on criteria
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Find The Perfect Talent</h1>
            <p className="text-gray-600">Connect with thousands of qualified candidates for your open positions</p>
          </div>
          
          {/* Search */}
          <div className="mb-8 relative max-w-2xl">
            <input
              type="text"
              placeholder="Search for talent..."
              className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <Button className="absolute right-2 top-2 bg-primary-gradient hover:bg-primary/90 transition-all">
              Search
            </Button>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'outline'} 
              onClick={() => filterCompanies('all')}
              className={activeFilter === 'all' ? 'bg-primary' : ''}
            >
              All Companies
            </Button>
            <Button 
              variant={activeFilter === 'tech' ? 'default' : 'outline'}
              onClick={() => filterCompanies('tech')}
              className={activeFilter === 'tech' ? 'bg-primary' : ''}
            >
              Technology
            </Button>
            <Button 
              variant={activeFilter === 'finance' ? 'default' : 'outline'}
              onClick={() => filterCompanies('finance')}
              className={activeFilter === 'finance' ? 'bg-primary' : ''}
            >
              Finance
            </Button>
            <Button 
              variant={activeFilter === 'health' ? 'default' : 'outline'}
              onClick={() => filterCompanies('health')}
              className={activeFilter === 'health' ? 'bg-primary' : ''}
            >
              Healthcare
            </Button>
            <Button 
              variant={activeFilter === 'remote' ? 'default' : 'outline'}
              onClick={() => filterCompanies('remote')}
              className={activeFilter === 'remote' ? 'bg-primary' : ''}
            >
              Remote Only
            </Button>
          </div>
          
          {/* Main content */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Top Hiring Companies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employers.map(employer => (
                <Card key={employer.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className={`p-6 ${employer.color}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-white rounded-md shadow-sm p-2 flex items-center justify-center mr-4">
                        <img src={employer.logo} alt={employer.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl text-primary">{employer.name}</h3>
                        <p className="text-gray-600">{employer.industry}</p>
                      </div>
                    </div>
                    
                    <p className="mb-6 text-gray-700">{employer.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1 text-gray-400" />
                        {employer.location}
                      </div>
                      <div className="flex items-center">
                        <Star size={16} className="mr-1 text-yellow-500" />
                        {employer.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                      <div className="flex items-center">
                        <Users size={16} className="mr-1 text-gray-400" />
                        {employer.employees}
                      </div>
                      <div className="flex items-center">
                        <BriefcaseBusiness size={16} className="mr-1 text-primary" />
                        <span className="font-semibold text-primary">{employer.openPositions} open positions</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button className="bg-primary-gradient hover:opacity-90 transition-all">
                        View Jobs
                      </Button>
                      <Button variant="outline" className="flex items-center">
                        Company Profile <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <Building className="mx-auto mb-4 h-12 w-12 opacity-80" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Perfect Candidates?</h2>
              <p className="mb-6 text-white/80">Post a job today and get matched with qualified candidates through our AI-driven platform.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-white text-primary hover:bg-gray-100 transition-colors">
                  Post a Job
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn About Our Process
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Employers;
