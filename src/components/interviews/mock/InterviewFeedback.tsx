
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, ThumbsUp, Award, Star, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeedbackItem {
  category: string;
  score: number;
  feedback: string;
  icon: React.ReactNode;
}

interface InterviewFeedbackProps {
  overallScore: number;
  feedbackItems: FeedbackItem[];
  detailedFeedback: string;
  onFinish: () => void;
}

const InterviewFeedback: React.FC<InterviewFeedbackProps> = ({
  overallScore,
  feedbackItems,
  detailedFeedback,
  onFinish
}) => {
  // Helper function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Helper function to get color based on score
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Interview Performance</h2>
        <p className="text-gray-600 mb-4">Here's how you did in your mock interview</p>
        
        <div className="flex justify-center items-center mb-6">
          <div className="relative w-40 h-40">
            <div className={`text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getScoreColor(overallScore)}`}>
              {overallScore}%
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className={getScoreColor(overallScore).replace('text-', 'text-')}
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallScore / 100)}`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Scoring Breakdown</h3>
        
        {feedbackItems.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {item.icon}
                <span className="ml-2 font-medium">{item.category}</span>
              </div>
              <span className={`font-semibold ${getScoreColor(item.score)}`}>{item.score}%</span>
            </div>
            <Progress 
              value={item.score} 
              className="h-2" 
              indicatorClassName={getProgressColor(item.score)}
            />
            <p className="text-sm text-gray-600">{item.feedback}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-medium mb-2 flex items-center">
          <Brain className="mr-2 text-primary" size={18} />
          AI Feedback Summary
        </h3>
        <p className="text-gray-700 whitespace-pre-line">{detailedFeedback}</p>
      </div>

      <div className="pt-4 flex justify-center">
        <Button onClick={onFinish} className="bg-primary-gradient px-6">
          Return to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default InterviewFeedback;
