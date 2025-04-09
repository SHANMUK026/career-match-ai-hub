
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResumeUpload from '@/components/jobs/ResumeUpload';
import VideoInterview from '@/components/interviews/VideoInterview';
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
import { toast } from 'sonner';

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
  {
    id: "2",
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    location: 'Remote',
    type: 'Contract',
    salary: '$90k - $110k',
    posted: '1 week ago',
    description: 'We are seeking a talented UI/UX Designer to create amazing user experiences. The ideal candidate should have a strong portfolio demonstrating their ability to create intuitive and visually appealing interfaces.',
    responsibilities: [
      'Create user flows, wireframes, prototypes and mockups',
      'Translate requirements into style guides, design systems, and UI components',
      'Design UI elements such as input controls, navigational components and informational components',
      'Create original graphic designs (e.g. images, sketches and tables)',
      'Identify and troubleshoot UX problems'
    ],
    requirements: [
      'Proven experience as a UI/UX Designer or similar role',
      'Strong portfolio of design projects',
      'Proficiency in design software (Figma, Adobe XD, Sketch)',
      'Knowledge of wireframe tools',
      'Up-to-date knowledge of design trends and technologies'
    ],
    companyInfo: 'DesignStudio is a creative agency focused on brand strategy, identity design, and digital experiences. We work with clients ranging from startups to Fortune 500 companies.'
  },
  {
    id: "3",
    title: 'Backend Developer',
    company: 'ServerTech',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$110k - $140k',
    posted: '3 days ago',
    description: 'ServerTech is looking for a Backend Developer to build efficient server-side applications. You will be responsible for developing and maintaining the core functional logic and performance of our applications.',
    responsibilities: [
      'Write clean, maintainable and efficient code',
      'Design and implement low-latency, high-availability, and performant applications',
      'Implement security and data protection measures',
      'Integrate user-facing elements with server-side logic',
      'Build reusable code and libraries for future use'
    ],
    requirements: [
      'Strong proficiency in Node.js, Python, or Java',
      'Understanding of databases and SQL',
      'Knowledge of API design and development',
      'Familiarity with cloud services (AWS, Azure, or GCP)',
      'Experience with automated testing platforms and unit tests'
    ],
    companyInfo: 'ServerTech specializes in developing high-performance backend systems for web and mobile applications. Our mission is to provide reliable and scalable server-side solutions for businesses of all sizes.'
  },
  {
    id: "4",
    title: 'Data Scientist',
    company: 'DataInsight',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$130k - $160k',
    posted: '5 days ago',
    description: 'DataInsight is seeking a Data Scientist to analyze large datasets and derive valuable insights. You will work on complex business problems, develop predictive models, and communicate findings to stakeholders.',
    responsibilities: [
      'Analyze large datasets to find patterns and insights',
      'Develop predictive models and machine learning algorithms',
      'Create data visualizations to communicate findings',
      'Collaborate with engineering and product teams',
      'Improve data collection procedures to include relevant information'
    ],
    requirements: [
      'Masters or PhD in Statistics, Mathematics, Computer Science or related field',
      'Strong experience with statistical analysis tools (R, Python, SAS)',
      'Experience with machine learning frameworks (TensorFlow, PyTorch, scikit-learn)',
      'Knowledge of data visualization tools',
      'Strong problem-solving skills and business acumen'
    ],
    companyInfo: 'DataInsight leverages advanced analytics and machine learning to help businesses make data-driven decisions. We work across various industries including finance, healthcare, and retail to transform raw data into actionable insights.'
  }
];

const JobApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicationStep, setApplicationStep] = useState<'info' | 'interview'>('info');
  
  // Find the job based on the URL parameter
  const job = jobsData.find(job => job.id === id);
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4 text-readable">Job Not Found</h1>
            <p className="mb-6 text-readable-secondary">The job you're looking for doesn't exist or has been removed.</p>
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
  
  const handleSubmitApplication = () => {
    setApplicationStep('interview');
    toast.success('Application submitted! Proceeding to video interview.');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {applicationStep === 'info' ? (
            <>
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
                <p className="text-readable-secondary">
                  Complete the application form below to apply for this position.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ResumeUpload jobId={job.id} jobTitle={job.title} onComplete={handleSubmitApplication} />
                </div>
                
                <div className="space-y-6">
                  <Card className="p-6 shadow-md border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-3 text-readable">Job Summary</h2>
                    <div className="border-l-4 border-primary pl-4 py-2 mb-4">
                      <h3 className="font-bold text-xl text-readable">{job.title}</h3>
                      <p className="text-readable-secondary">{job.company}</p>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span className="text-readable-secondary">{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <BriefcaseBusiness className="h-4 w-4 text-primary mr-2" />
                        <span className="text-readable-secondary">{job.type}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-primary mr-2" />
                        <span className="text-readable-secondary">{job.salary}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-primary mr-2" />
                        <span className="text-readable-secondary">Posted {job.posted}</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 shadow-md border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-readable">Required Documents</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-readable-secondary">Resume/CV (PDF format, max 5MB)</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-readable-secondary">Cover letter (optional but recommended)</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-readable-secondary">Professional references (optional)</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-readable-secondary">Portfolio links (if applicable)</p>
                      </li>
                    </ul>
                  </Card>
                  
                  <Card className="p-6 shadow-md border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-readable">Application Tips</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-readable-secondary">Tailor your resume to highlight relevant experience for this position</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-readable-secondary">Use specific examples from your past work that demonstrate required skills</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-readable-secondary">Keep your cover letter concise and focused on why you're a good fit</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-readable-secondary">Research {job.company} before applying to understand their values and culture</p>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary/80 hover:bg-primary/10"
                  onClick={() => setApplicationStep('info')}
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Back to Application
                </Button>
                
                <h1 className="text-2xl font-bold text-primary">
                  AI-Powered Video Interview for {job.title}
                </h1>
              </div>
              
              <VideoInterview jobId={job.id} jobTitle={job.title} companyName={job.company} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobApplicationPage;
