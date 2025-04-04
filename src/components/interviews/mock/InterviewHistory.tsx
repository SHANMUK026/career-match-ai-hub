
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileQuestion } from 'lucide-react';
import { InterviewHistory } from './mockInterviewTypes';

interface InterviewHistoryProps {
  interviewHistory: InterviewHistory[];
  onStartNewInterview: () => void;
}

const InterviewHistoryComponent: React.FC<InterviewHistoryProps> = ({
  interviewHistory,
  onStartNewInterview
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Interview History</h2>
      
      {interviewHistory.length === 0 ? (
        <div className="text-center py-8">
          <FileQuestion size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">You haven't completed any interviews yet</p>
          <Button className="mt-4" onClick={onStartNewInterview}>
            Start Your First Interview
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {interviewHistory.map((interview, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{interview.role}</h3>
                  <p className="text-sm text-gray-500">{interview.date}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-primary">Score: {interview.score}%</div>
                  <p className="text-sm text-gray-500">{interview.questions} questions</p>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <Button variant="link" size="sm" className="text-primary">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default InterviewHistoryComponent;
