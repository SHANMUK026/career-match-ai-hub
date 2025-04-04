
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import JobCard, { JobCardProps } from '@/components/jobs/JobCard';

const jobListings = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    posted: '3 days ago',
    description: 'Join our team to build innovative web applications using React and modern JavaScript frameworks.'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$110k - $140k',
    posted: '1 week ago',
    description: 'Lead product development initiatives and work with cross-functional teams to deliver world-class products.'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Agency',
    location: 'Remote',
    type: 'Contract',
    salary: '$90k - $120k',
    posted: '2 days ago',
    description: 'Design beautiful and intuitive user interfaces for web and mobile applications.'
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'AI Solutions',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$130k - $160k',
    posted: '5 days ago',
    description: 'Apply machine learning and statistical methods to solve complex business problems.'
  },
  {
    id: 5,
    title: 'Marketing Manager',
    company: 'Growth Partners',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$85k - $110k',
    posted: '1 week ago',
    description: 'Develop and execute marketing campaigns to drive brand awareness and customer acquisition.'
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    location: 'Remote',
    type: 'Full-time',
    salary: '$115k - $145k',
    posted: '4 days ago',
    description: 'Build and maintain cloud infrastructure and CI/CD pipelines for scalable applications.'
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
            <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300">
              <JobCard {...job} />
            </div>
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
