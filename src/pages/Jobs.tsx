
import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import JobSearch from '@/components/jobs/JobSearch';
import JobFilters from '@/components/jobs/JobFilters';
import JobList from '@/components/jobs/JobList';
import { JobCardProps } from '@/components/jobs/JobCard';
import { Skeleton } from '@/components/ui/skeleton';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample job data - in a real app this would come from an API
  const jobs: JobCardProps[] = [
    {
      id: "1",
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      posted: '2 days ago',
      description: 'We are looking for an experienced Frontend Developer to join our team...'
    },
    {
      id: "2",
      title: 'Product Manager',
      company: 'InnovateNow',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110k - $140k',
      posted: '1 week ago',
      description: 'Lead product development and work closely with engineering teams...'
    },
    {
      id: "3",
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $160k',
      posted: '3 days ago',
      description: 'Apply machine learning techniques to solve business problems...'
    },
    {
      id: "4",
      title: 'UX/UI Designer',
      company: 'DesignHub',
      location: 'Austin, TX',
      type: 'Contract',
      salary: '$80k - $100k',
      posted: '5 days ago',
      description: 'Create beautiful, intuitive interfaces for our flagship products...'
    },
    {
      id: "5",
      title: 'DevOps Engineer',
      company: 'CloudScale',
      location: 'Remote',
      type: 'Full-time',
      salary: '$125k - $155k',
      posted: '1 day ago',
      description: 'Build and maintain our cloud infrastructure and CI/CD pipelines...'
    },
    {
      id: "6",
      title: 'Marketing Specialist',
      company: 'GrowthGenius',
      location: 'Chicago, IL',
      type: 'Part-time',
      salary: '$60k - $75k',
      posted: '1 week ago',
      description: 'Develop and execute marketing campaigns across multiple channels...'
    }
  ];
  
  // Simulate loading and then display jobs - in a real app this would be an API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Fast loading simulation
    
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize filtered jobs to avoid unnecessary re-renders
  const filteredJobs = useMemo(() => {
    if (!searchTerm) return jobs;
    
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);
  
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
            <JobSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Button className="bg-primary-gradient">
              <Filter className="mr-2" size={18} />
              Filters
            </Button>
          </div>
          
          {/* Filters Sidebar and Job Listings */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
              <JobFilters />
            </div>
            
            {/* Job Listings */}
            <div className="md:col-span-3">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-40 w-full rounded-md" />
                  ))}
                </div>
              ) : (
                <>
                  {filteredJobs.length > 0 ? (
                    <JobList jobs={filteredJobs} />
                  ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                      <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        We couldn't find any jobs matching your criteria. Try adjusting your search.
                      </p>
                      <Button 
                        onClick={() => setSearchTerm('')}
                        variant="outline"
                      >
                        Clear Search
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
