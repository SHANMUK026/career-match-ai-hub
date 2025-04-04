
import React from 'react';
import { Card } from '@/components/ui/card';

const InterviewTips: React.FC = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Interview Tips</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-lg mb-2">Before the Interview</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Research the company and position thoroughly</li>
            <li>Prepare answers to common questions for your role</li>
            <li>Practice with a friend or mentor</li>
            <li>Prepare your own questions to ask the interviewer</li>
            <li>Get a good night's sleep before the interview</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">During the Interview</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Use the STAR method for behavioral questions (Situation, Task, Action, Result)</li>
            <li>Be specific with examples from your experience</li>
            <li>Listen carefully to the questions before answering</li>
            <li>Be concise but thorough in your responses</li>
            <li>Show enthusiasm and positive body language</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">After the Interview</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Send a thank-you email within 24 hours</li>
            <li>Reflect on your performance and areas to improve</li>
            <li>Follow up appropriately if you don't hear back</li>
            <li>Continue your job search until you have an official offer</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default InterviewTips;
