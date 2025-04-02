
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, MapPin, DollarSign, BarChart } from 'lucide-react';

const recommendedJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechNova',
    location: 'San Francisco, CA',
    salary: '$130k - $160k',
    matchScore: 98,
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  },
  {
    id: 2,
    title: 'React Team Lead',
    company: 'InnovateTech',
    location: 'Remote',
    salary: '$140k - $170k',
    matchScore: 95,
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'EnterpriseAI',
    location: 'Austin, TX',
    salary: '$120k - $150k',
    matchScore: 92,
    logo: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
  },
];

const JobRecommendations = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">AI Job Recommendations</CardTitle>
          <Button variant="ghost" className="text-sm text-primary" size="sm">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 mr-4 bg-gray-100 flex items-center justify-center">
                  <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      <BarChart className="mr-1 h-3 w-3" />
                      {job.matchScore}% Match
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{job.company}</p>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      Full-time
                    </div>
                    <div className="flex items-center col-span-2">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-primary-gradient text-white">
                      Apply Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobRecommendations;
