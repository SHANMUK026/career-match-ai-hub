
import React from 'react';
import JobCard, { JobCardProps } from './JobCard';

interface JobListProps {
  jobs: JobCardProps[];
}

const JobList = ({ jobs }: JobListProps) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Job Listings</h3>
      <div className="space-y-4">
        {jobs.map(job => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
