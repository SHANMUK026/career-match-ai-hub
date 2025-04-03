
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, BriefcaseBusiness, DollarSign, Clock, Building, ArrowLeft, User, BookOpen, FileBadge } from 'lucide-react';
import { toast } from 'sonner';

// Mock job data - in a real app, this would come from a database
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
    title: 'Product Manager',
    company: 'InnovateNow',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110k - $140k',
    posted: '1 week ago',
    description: 'Lead product development and work closely with engineering teams to deliver user-centric products. The ideal candidate has experience with agile methodologies and a track record of successful product launches.',
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize product requirements',
      'Work closely with engineering, design, and marketing teams',
      'Define product metrics and track success',
      'Conduct competitive analysis and market research'
    ],
    requirements: [
      '3+ years of experience in product management',
      'Experience with agile development methodologies',
      'Strong analytical and problem-solving skills',
      'Excellent communication and collaboration abilities',
      'Technical background preferred'
    ],
    companyInfo: 'InnovateNow is a dynamic startup focused on creating cutting-edge products that solve real-world problems. We believe in innovation, collaboration, and making a positive impact.'
  },
  {
    id: "3",
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130k - $160k',
    posted: '3 days ago',
    description: 'Apply machine learning techniques to solve business problems and generate actionable insights from complex data sets. The ideal candidate has experience with statistical analysis and data visualization.',
    responsibilities: [
      'Develop machine learning models to solve business problems',
      'Clean and preprocess large datasets',
      'Create data visualizations to communicate insights',
      'Collaborate with product and engineering teams',
      'Stay up-to-date with the latest ML research and techniques'
    ],
    requirements: [
      'MS or PhD in Computer Science, Statistics, or related field',
      'Experience with Python, R, and ML libraries',
      'Strong understanding of statistical analysis',
      'Experience with data visualization tools',
      'Excellent problem-solving skills'
    ],
    companyInfo: 'Analytics Pro is a data science consultancy that helps businesses leverage their data to make better decisions. We work with Fortune 500 companies and startups alike.'
  },
  {
    id: "4",
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'Austin, TX',
    type: 'Contract',
    salary: '$80k - $100k',
    posted: '5 days ago',
    description: 'Create beautiful, intuitive interfaces for our flagship products. Work on end-to-end design process from research to implementation.',
    responsibilities: [
      'Create wireframes, prototypes, and user flows',
      'Conduct user research and usability testing',
      'Work closely with product and engineering teams',
      'Design visually appealing and intuitive interfaces',
      'Create and maintain design systems'
    ],
    requirements: [
      '3+ years of experience in UX/UI design',
      'Proficiency with design tools like Figma or Sketch',
      'Understanding of design principles and accessibility',
      'Portfolio demonstrating UI/UX projects',
      'Excellent communication skills'
    ],
    companyInfo: 'DesignHub is a creative agency that specializes in creating beautiful, user-friendly digital experiences. We believe that great design can transform businesses.'
  },
  {
    id: "5",
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Remote',
    type: 'Full-time',
    salary: '$125k - $155k',
    posted: '1 day ago',
    description: 'Build and maintain our cloud infrastructure and CI/CD pipelines. Ensure reliability, scalability, and security of our platforms.',
    responsibilities: [
      'Manage cloud infrastructure on AWS, GCP, or Azure',
      'Implement and maintain CI/CD pipelines',
      'Automate infrastructure using tools like Terraform',
      'Monitor system performance and troubleshoot issues',
      'Collaborate with development teams to deploy applications'
    ],
    requirements: [
      '4+ years of experience in DevOps or SRE roles',
      'Experience with cloud platforms (AWS, GCP, Azure)',
      'Knowledge of containerization and orchestration tools',
      'Experience with infrastructure as code',
      'Strong troubleshooting and problem-solving skills'
    ],
    companyInfo: 'CloudScale is a cloud infrastructure company helping businesses scale their operations efficiently. We provide cutting-edge solutions for cloud deployment and management.'
  },
  {
    id: "6",
    title: 'Marketing Specialist',
    company: 'GrowthGenius',
    location: 'Chicago, IL',
    type: 'Part-time',
    salary: '$60k - $75k',
    posted: '1 week ago',
    description: 'Develop and execute marketing campaigns across multiple channels. Drive brand awareness and lead generation for our B2B solutions.',
    responsibilities: [
      'Create and implement marketing campaigns',
      'Manage social media presence',
      'Generate content for blogs, newsletters, and website',
      'Track and analyze marketing metrics',
      'Collaborate with sales teams'
    ],
    requirements: [
      '2+ years of experience in digital marketing',
      'Experience with marketing automation tools',
      'Strong writing and communication skills',
      'Knowledge of SEO and analytics',
      'Creative problem-solving abilities'
    ],
    companyInfo: 'GrowthGenius is a marketing agency specializing in helping B2B companies grow their customer base. We use data-driven strategies to achieve measurable results.'
  }
];

const JobDetail = () => {
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
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="mb-6">The job you're looking for doesn't exist or has been removed.</p>
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
  
  const handleApply = () => {
    toast.success("Application submitted successfully!");
  };
  
  const handleSaveJob = () => {
    toast.success("Job saved to your favorites!");
  };
  
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
          
          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="md:flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">{job.title}</h1>
                <div className="flex items-center mb-4">
                  <Building className="mr-2 text-gray-600" size={18} />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4 text-sm text-gray-600">
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
              Posted {job.posted}
            </div>
          </div>
          
          {/* Job Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-700 mb-6">{job.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.requirements.map((item, index) => (
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
                <p className="text-gray-700 mb-6">{job.companyInfo}</p>
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
          
          {/* Similar Jobs */}
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
