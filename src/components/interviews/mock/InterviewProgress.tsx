
import React from 'react';
import { Card } from '@/components/ui/card';

interface InterviewProgressProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  completedQuestions: number[];
  showFeedback: boolean;
}

const InterviewProgress: React.FC<InterviewProgressProps> = ({
  totalQuestions,
  currentQuestionIndex,
  completedQuestions,
  showFeedback
}) => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-3">Progress</h3>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div 
            key={index}
            className={`h-2 rounded-full ${
              index === currentQuestionIndex && !showFeedback
                ? 'bg-primary animate-pulse' 
                : completedQuestions.includes(index)
                  ? 'bg-green-500'
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </Card>
  );
};

export default InterviewProgress;
