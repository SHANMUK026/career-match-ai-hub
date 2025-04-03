
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

const jobListings = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$110k - $140k',
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Agency',
    location: 'Remote',
    type: 'Contract',
    salary: '$90k - $120k',
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'AI Solutions',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$130k - $160k',
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  },
  {
    id: 5,
    title: 'Marketing Manager',
    company: 'Growth Partners',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$85k - $110k',
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    location: 'Remote',
    type: 'Full-time',
    salary: '$115k - $145k',
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  },
];

const JobListingsSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Job Opportunities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore top job listings matched to your skills and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobListings.map((job) => (
            <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-4 bg-gray-100 flex items-center justify-center">
                    <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h3 
                      className="text-lg font-bold mb-1 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      {job.title}
                    </h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500">
                    <MapPin size={16} className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Briefcase size={16} className="mr-2" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <DollarSign size={16} className="mr-2" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-gray-50 px-6 py-4 border-t">
                <Button 
                  className="w-full bg-white hover:bg-primary hover:text-white transition-colors border border-gray-200 text-gray-700"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="btn-primary" onClick={() => navigate('/jobs')}>
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobListingsSection;
