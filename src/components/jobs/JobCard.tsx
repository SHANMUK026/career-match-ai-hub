
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, BriefcaseBusiness, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export interface JobCardProps {
  id: number | string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
}

const JobCard = ({ id, title, company, location, type, salary, posted, description }: JobCardProps) => {
  const navigate = useNavigate();
  
  const handleApplyClick = () => {
    if (!id) {
      toast.error('Job information is incomplete. Please try again later.');
      return;
    }
    navigate(`/job-application/${id}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between mb-2">
        <h3 
          className="font-semibold text-xl text-primary hover:underline cursor-pointer"
          onClick={() => navigate(`/jobs/${id}`)}
        >
          {title}
        </h3>
        <Button variant="outline" className="text-sm px-3 py-1 h-auto">Save</Button>
      </div>
      <h4 className="font-medium mb-3">{company}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin size={16} className="mr-1" />
          {location}
        </div>
        <div className="flex items-center">
          <BriefcaseBusiness size={16} className="mr-1" />
          {type}
        </div>
        <div className="flex items-center">
          <DollarSign size={16} className="mr-1" />
          {salary}
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-1" />
          Posted {posted}
        </div>
        <Button 
          className="bg-primary-gradient transition-transform hover:scale-105"
          onClick={handleApplyClick}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
