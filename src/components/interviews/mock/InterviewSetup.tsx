
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { jobRoles, difficultyLevels } from './mockInterviewData';

interface InterviewSetupProps {
  selectedRole: string;
  selectedDifficulty: string;
  onRoleChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onStartInterview: () => void;
}

const InterviewSetup: React.FC<InterviewSetupProps> = ({
  selectedRole,
  selectedDifficulty,
  onRoleChange,
  onDifficultyChange,
  onStartInterview
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Set Up Your Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Job Role</label>
          <Select value={selectedRole} onValueChange={onRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a job role" />
            </SelectTrigger>
            <SelectContent>
              {jobRoles.map(role => (
                <SelectItem key={role.id} value={role.title}>
                  {role.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Difficulty Level</label>
          <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficultyLevels.map(level => (
                <SelectItem key={level.id} value={level.label}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/smart-interview')}>
          Try Smart Interview
        </Button>
        <Button className="bg-primary-gradient" onClick={onStartInterview}>
          Start Interview
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default InterviewSetup;
