
import React from 'react';
import { Button } from '@/components/ui/button';

const JobFilters = () => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Job Type</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="full-time" className="mr-2" />
              <label htmlFor="full-time">Full-time</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="part-time" className="mr-2" />
              <label htmlFor="part-time">Part-time</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="contract" className="mr-2" />
              <label htmlFor="contract">Contract</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="remote" className="mr-2" />
              <label htmlFor="remote">Remote</label>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Experience Level</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="entry" className="mr-2" />
              <label htmlFor="entry">Entry Level</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="mid" className="mr-2" />
              <label htmlFor="mid">Mid Level</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="senior" className="mr-2" />
              <label htmlFor="senior">Senior Level</label>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Salary Range</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="50k" className="mr-2" />
              <label htmlFor="50k">$0 - $50k</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="100k" className="mr-2" />
              <label htmlFor="100k">$50k - $100k</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="150k" className="mr-2" />
              <label htmlFor="150k">$100k - $150k</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="150k-plus" className="mr-2" />
              <label htmlFor="150k-plus">$150k+</label>
            </div>
          </div>
        </div>
        
        <Button className="w-full mt-4">Apply Filters</Button>
      </div>
    </div>
  );
};

export default JobFilters;
