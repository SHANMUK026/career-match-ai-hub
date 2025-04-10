import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, BriefcaseBusiness, DollarSign, Clock, Building, ArrowLeft, User, BookOpen, FileBadge } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

import { jobsData } from '@/data/jobsData';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<any>(null);
  
  useEffect(() => {
    const fetchJob = () => {
      const timer = setTimeout(() => {
        const foundJob = jobsData.find(job => job.id === id);
        setJob(foundJob || null);
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    };
    
    fetchJob();
  }, [id]);
  
  const handleApply = () => {
    navigate(`/job-application/${id}`);
  };
  
  const handleSaveJob = () => {
    toast.success("Job saved to your favorites!");
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate('/jobs')}
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Jobs
          </Button>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <Skeleton className="h-10 w-2/3 mb-4" />
            <Skeleton className="h-6 w-1/3 mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full rounded-md mb-6" />
              <Skeleton className="h-64 w-full rounded-md" />
            </div>
            <div>
              <Skeleton className="h-64 w-full rounded-md mb-6" />
              <Skeleton className="h-48 w-full rounded-md" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-10 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-red-500">Job Not Found</h1>
            <p className="mb-6 text-lg">Sorry, the job you're looking for doesn't exist or has been removed.</p>
            <Button 
              className="bg-primary-gradient" 
              size="lg"
              onClick={() => navigate('/jobs')}
            >
              <ArrowLeft className="mr-2" size={18} />
              Browse All Jobs
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate('/jobs')}
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Jobs
          </Button>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="md:flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">{job?.title}</h1>
                <div className="flex items-center mb-4">
                  <Building className="mr-2 text-gray-600" size={18} />
                  <span className="font-medium">{job?.company}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {job?.location}
                  </div>
                  <div className="flex items-center">
                    <BriefcaseBusiness size={16} className="mr-1" />
                    {job?.type}
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-1" />
                    {job?.salary}
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 space-y-3">
                <Button className="w-full bg-primary-gradient" onClick={handleApply}>
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full" onClick={handleSaveJob}>
                  Save Job
                </Button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center text-sm text-gray-500">
              <Clock size={16} className="mr-1" />
              Posted {job?.posted}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-700 mb-6">{job?.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                  {job?.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job?.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Prepare for Interview</h2>
                <p className="text-gray-700 mb-6">
                  Get ready for your interview with our AI-powered tools and resources.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center py-6"
                    onClick={() => navigate('/mock-interview')}
                  >
                    <User className="mr-2" size={18} />
                    Mock Interview
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center py-6"
                    onClick={() => navigate('/assessments')}
                  >
                    <FileBadge className="mr-2" size={18} />
                    Take Assessment
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Company Information</h2>
                <p className="text-gray-700 mb-6">{job?.companyInfo}</p>
                <Button className="w-full" variant="outline" onClick={() => navigate(`/employers`)}>
                  View Company Profile
                </Button>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Learning Resources</h2>
                <p className="text-gray-700 mb-4">Enhance your skills with these resources:</p>
                <ul className="space-y-4">
                  <li>
                    <Button variant="link" className="flex items-center p-0 text-primary">
                      <BookOpen className="mr-2" size={16} />
                      Technical Interview Guide
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="flex items-center p-0 text-primary">
                      <BookOpen className="mr-2" size={16} />
                      Resume Writing Tips
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="flex items-center p-0 text-primary">
                      <BookOpen className="mr-2" size={16} />
                      Salary Negotiation Tips
                    </Button>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Similar Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobsData.filter(j => j.id !== job.id).slice(0, 3).map(similarJob => (
                <Card key={similarJob.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 hover:text-primary cursor-pointer" onClick={() => navigate(`/jobs/${similarJob.id}`)}>
                      {similarJob.title}
                    </h3>
                    <p className="mb-3 text-gray-600">{similarJob.company}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {similarJob.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        {similarJob.salary}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 border-t">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => navigate(`/jobs/${similarJob.id}`)}
                    >
                      View Job
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetail;
