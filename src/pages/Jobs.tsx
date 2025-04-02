
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Search, Filter, MapPin, BriefcaseBusiness, Clock, DollarSign } from 'lucide-react';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample job data
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      posted: '2 days ago',
      description: 'We are looking for an experienced Frontend Developer to join our team...'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'InnovateNow',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110k - $140k',
      posted: '1 week ago',
      description: 'Lead product development and work closely with engineering teams...'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $160k',
      posted: '3 days ago',
      description: 'Apply machine learning techniques to solve business problems...'
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      company: 'DesignHub',
      location: 'Austin, TX',
      type: 'Contract',
      salary: '$80k - $100k',
      posted: '5 days ago',
      description: 'Create beautiful, intuitive interfaces for our flagship products...'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudScale',
      location: 'Remote',
      type: 'Full-time',
      salary: '$125k - $155k',
      posted: '1 day ago',
      description: 'Build and maintain our cloud infrastructure and CI/CD pipelines...'
    },
    {
      id: 6,
      title: 'Marketing Specialist',
      company: 'GrowthGenius',
      location: 'Chicago, IL',
      type: 'Part-time',
      salary: '$60k - $75k',
      posted: '1 week ago',
      description: 'Develop and execute marketing campaigns across multiple channels...'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Job</h1>
            <p className="text-gray-600">Browse through thousands of opportunities matched to your skills</p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, company, or keywords"
                className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
            <Button className="bg-primary-gradient">
              <Filter className="mr-2" size={18} />
              Filters
            </Button>
          </div>
          
          {/* Filters Sidebar and Job Listings */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-5">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Job Type</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="full-time" className="mr-2" />
                        <label htmlFor="full-time">Full-time</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="part-time" className="mr-2" />
                        <label htmlFor="part-time">Part-time</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="contract" className="mr-2" />
                        <label htmlFor="contract">Contract</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="remote" className="mr-2" />
                        <label htmlFor="remote">Remote</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Experience Level</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="entry" className="mr-2" />
                        <label htmlFor="entry">Entry Level</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="mid" className="mr-2" />
                        <label htmlFor="mid">Mid Level</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="senior" className="mr-2" />
                        <label htmlFor="senior">Senior Level</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Salary Range</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="50k" className="mr-2" />
                        <label htmlFor="50k">$0 - $50k</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="100k" className="mr-2" />
                        <label htmlFor="100k">$50k - $100k</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="150k" className="mr-2" />
                        <label htmlFor="150k">$100k - $150k</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="150k-plus" className="mr-2" />
                        <label htmlFor="150k-plus">$150k+</label>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">Apply Filters</Button>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="md:col-span-3">
              <h3 className="font-semibold text-lg mb-4">Job Listings</h3>
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold text-xl text-primary hover:underline cursor-pointer">{job.title}</h3>
                      <Button variant="outline" className="text-sm px-3 py-1 h-auto">Save</Button>
                    </div>
                    <h4 className="font-medium mb-3">{job.company}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <BriefcaseBusiness size={16} className="mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={16} className="mr-1" />
                        {job.salary}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1" />
                        Posted {job.posted}
                      </div>
                      <Button className="bg-primary-gradient transition-transform hover:scale-105">Apply Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
