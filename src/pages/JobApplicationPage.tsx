
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResumeUpload from '@/components/jobs/ResumeUpload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  Clock, 
  DollarSign, 
  BriefcaseBusiness,
  BookOpen,
  CheckCircle
} from 'lucide-react';

// Import job data from JobDetail
const jobsData = [
  {
    id: "1",
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    posted: '2 days ago',
    description: 'We are looking for an experienced Frontend Developer to join our team to build innovative web applications with React and Typescript. The ideal candidate has 5+ years of experience with modern JavaScript frameworks.',
    responsibilities: [
      'Develop new user-facing features using React.js',
      'Build reusable components and front-end libraries for future use',
      'Optimize components for maximum performance across devices and browsers',
      'Collaborate with backend developers and designers to improve usability',
      'Implement responsive design and ensure cross-browser compatibility'
    ],
    requirements: [
      '5+ years of experience with JavaScript and React',
      'Proficiency with HTML, CSS, and responsive design',
      'Experience with Typescript and state management libraries',
      'Knowledge of modern authorization mechanisms and UI/UX design',
      'Excellent communication and teamwork skills'
    ],
    companyInfo: 'TechCorp is a leading software company specializing in enterprise solutions. We have been in business for over 10 years and have offices across the globe.'
  },
  // ... other jobs
];

const JobApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the job based on the URL parameter
  const job = jobsData.find(job => job.id === id);
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Job Not Found</h1>
            <p className="mb-6 text-gray-800 dark:text-gray-200">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/jobs')}>
              <ArrowLeft className="mr-2" size={18} />
              Back to Jobs
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
      <main className="flex-grow pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6 text-primary hover:text-primary/80 hover:bg-primary/10"
            onClick={() => navigate(`/jobs/${id}`)}
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Job Details
          </Button>
          
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              Apply for {job.title} at {job.company}
            </h1>
            <p className="text-gray-800 dark:text-gray-200">
              Complete the application form below to apply for this position.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ResumeUpload jobId={job.id} jobTitle={job.title} />
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 shadow-md border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Job Summary</h2>
                <div className="border-l-4 border-primary pl-4 py-2 mb-4">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">{job.title}</h3>
                  <p className="text-gray-800 dark:text-gray-200">{job.company}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-800 dark:text-gray-200">{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <BriefcaseBusiness className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-800 dark:text-gray-200">{job.type}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-800 dark:text-gray-200">{job.salary}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-800 dark:text-gray-200">Posted {job.posted}</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 shadow-md border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Required Documents</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Resume/CV (PDF format, max 5MB)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Cover letter (optional but recommended)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Professional references (optional)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Portfolio links (if applicable)</p>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 shadow-md border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Application Tips</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Tailor your resume to highlight relevant experience for this position</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Use specific examples from your past work that demonstrate required skills</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Keep your cover letter concise and focused on why you're a good fit</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Research {job.company} before applying to understand their values and culture</p>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobApplicationPage;
