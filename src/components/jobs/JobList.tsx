
import React, { memo } from 'react';
import JobCard, { JobCardProps } from './JobCard';

interface JobListProps {
  jobs: JobCardProps[];
}

// Using memo to prevent unnecessary re-renders
const JobList = memo(({ jobs }: JobListProps) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">
        {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
      </h3>
      <div className="space-y-4">
        {jobs.map(job => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
});

JobList.displayName = 'JobList';

export default JobList;
