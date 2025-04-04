
import React from 'react';
import { Search } from 'lucide-react';

interface JobSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const JobSearch = ({ searchTerm, setSearchTerm }: JobSearchProps) => {
  return (
    <div className="flex-grow relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Job title, company, or keywords"
        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      />
      <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
    </div>
  );
};

export default JobSearch;
