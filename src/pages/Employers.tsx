
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Search, BriefcaseBusiness, MapPin, Star, Users, ChevronRight, Building } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Employers = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  
  // Enhanced employers data with more industry variety
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
      logo: '/lovable-uploads/3b7d6424-2c60-485b-a417-d419cbeffaa5.png',
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
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
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
    },
    {
      id: 7,
      name: 'Tesla',
      industry: 'Automotive & Tech',
      location: 'Austin, TX',
      description: 'Electric vehicle and clean energy company revolutionizing transportation',
      openPositions: 16,
      rating: 4.3,
      employees: '100,000+',
      logo: '/lovable-uploads/e0ced664-b053-4289-a65e-70ad432c63dd.png',
      color: 'bg-green-50'
    },
    // Finance companies
    {
      id: 8,
      name: 'JPMorgan Chase',
      industry: 'Finance',
      location: 'New York, NY',
      description: 'Global leader in financial services offering solutions to the world\'s most important corporations and governments',
      openPositions: 12,
      rating: 4.2,
      employees: '250,000+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/JPMorgan_Chase_Logo_2008.svg/1200px-JPMorgan_Chase_Logo_2008.svg.png',
      color: 'bg-blue-50'
    },
    {
      id: 9,
      name: 'Goldman Sachs',
      industry: 'Finance',
      location: 'New York, NY',
      description: 'Leading global investment banking, securities and investment management firm',
      openPositions: 9,
      rating: 4.4,
      employees: '40,000+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/1200px-Goldman_Sachs.svg.png',
      color: 'bg-gray-50'
    },
    // Healthcare companies
    {
      id: 10,
      name: 'Johnson & Johnson',
      industry: 'Healthcare',
      location: 'New Brunswick, NJ',
      description: 'Global leader in healthcare products, pharmaceuticals and medical devices',
      openPositions: 15,
      rating: 4.5,
      employees: '130,000+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Johnson_and_Johnson_logo.svg/2560px-Johnson_and_Johnson_logo.svg.png',
      color: 'bg-red-50'
    },
    {
      id: 11,
      name: 'Pfizer',
      industry: 'Healthcare',
      location: 'New York, NY',
      description: 'Global pharmaceutical corporation that discovers, develops, and provides medicines and vaccines',
      openPositions: 11,
      rating: 4.3,
      employees: '78,000+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Pfizer_logo.svg/2560px-Pfizer_logo.svg.png',
      color: 'bg-blue-50'
    },
    // Remote-first companies
    {
      id: 12,
      name: 'Gitlab',
      industry: 'Remote',
      location: 'Remote (Global)',
      description: 'DevOps platform delivered as a single application with a remote-first workforce',
      openPositions: 18,
      rating: 4.7,
      employees: '1,500+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/GitLab_logo.svg/1200px-GitLab_logo.svg.png',
      color: 'bg-orange-50'
    },
    {
      id: 13,
      name: 'Automattic',
      industry: 'Remote',
      location: 'Remote (Global)',
      description: 'Web development company behind WordPress.com with a fully distributed workforce',
      openPositions: 8,
      rating: 4.6,
      employees: '1,800+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Automattic_logo.svg/1200px-Automattic_logo.svg.png',
      color: 'bg-indigo-50'
    },
    // Startups
    {
      id: 14,
      name: 'Notion',
      industry: 'Startup',
      location: 'San Francisco, CA',
      description: 'All-in-one workspace for notes, tasks, wikis, and databases',
      openPositions: 6,
      rating: 4.8,
      employees: '400+',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
      color: 'bg-gray-50'
    },
    {
      id: 15,
      name: 'Vercel',
      industry: 'Startup',
      location: 'San Francisco, CA',
      description: 'Platform for frontend developers, providing speed and reliability for websites and applications',
      openPositions: 7,
      rating: 4.7,
      employees: '350+',
      logo: 'https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png',
      color: 'bg-black text-white'
    }
  ];

  const filterCompanies = (filter: string) => {
    setActiveFilter(filter);
    toast.success(`Filtered to show ${filter} companies`);
    // In a real app, this would filter the companies based on criteria
  };

  const handleViewJobs = (companyName: string) => {
    navigate(`/jobs?company=${companyName}`);
    toast.success(`Viewing jobs at ${companyName}`);
  };

  const handleViewCompanyProfile = (companyName: string) => {
    navigate(`/employers/profile?company=${companyName}`);
    toast.success(`Viewing ${companyName}'s company profile`);
  };

  // Filter the employers based on the active filter
  const filteredEmployers = activeFilter === 'all' 
    ? employers 
    : employers.filter(employer => employer.industry.toLowerCase().includes(activeFilter.toLowerCase()));

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
            <Button 
              variant={activeFilter === 'startup' ? 'default' : 'outline'}
              onClick={() => filterCompanies('startup')}
              className={activeFilter === 'startup' ? 'bg-primary' : ''}
            >
              Startups
            </Button>
          </div>
          
          {/* Main content */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{filteredEmployers.length} Companies Found</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployers.map(employer => (
                <Card key={employer.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className={`p-6 ${employer.color}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-white rounded-md shadow-sm p-2 flex items-center justify-center mr-4">
                        <img 
                          src={employer.logo} 
                          alt={employer.name} 
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://via.placeholder.com/150?text=" + employer.name;
                          }}
                        />
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
                      <Button 
                        className="bg-primary-gradient hover:opacity-90 transition-all"
                        onClick={() => handleViewJobs(employer.name)}
                      >
                        View Jobs
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center"
                        onClick={() => handleViewCompanyProfile(employer.name)}
                      >
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
                <Button className="bg-white text-primary hover:bg-gray-100 transition-colors" onClick={() => navigate('/jobs/post')}>
                  Post a Job
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('/assessments')}>
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
