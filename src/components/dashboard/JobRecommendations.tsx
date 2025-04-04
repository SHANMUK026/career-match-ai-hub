
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, MapPin, DollarSign, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const recommendedJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$140k - $180k',
    matchScore: 98,
    logo: '/lovable-uploads/31ce572b-2495-4b45-b3be-98807cf283d8.png',
  },
  {
    id: 2,
    title: 'React Team Lead',
    company: 'Microsoft',
    location: 'Remote',
    salary: '$140k - $170k',
    matchScore: 95,
    logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'Amazon',
    location: 'Seattle, WA',
    salary: '$130k - $160k',
    matchScore: 92,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
  },
  {
    id: 4,
    title: 'AI/ML Engineer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    salary: '$150k - $190k',
    matchScore: 90,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png',
  },
];

const JobRecommendations = () => {
  const navigate = useNavigate();
  
  const handleViewAll = () => {
    navigate('/jobs');
  };
  
  const handleApply = (jobId: number) => {
    navigate(`/job-application/${jobId}`);
    toast.success("Application started!");
  };
  
  const handleSave = (jobId: number) => {
    toast.success(`Job ${jobId} saved to your favorites`);
  };

  return (
    <Card className="shadow-md overflow-visible">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">AI Job Recommendations</CardTitle>
          <Button variant="ghost" className="text-sm text-primary" size="sm" onClick={handleViewAll}>
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[600px] pr-1">
        <div className="space-y-4">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-4 bg-gray-100 flex items-center justify-center">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
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
                    <Button 
                      size="sm" 
                      className="bg-primary-gradient text-white"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply Now
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSave(job.id)}
                    >
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
