
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoCall from '@/components/interviews/VideoCall';

const MockInterview = () => {
  const handleEndInterview = () => {
    // Handle interview completion
    console.log('Interview ended');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">AI Video Interview</h1>
          <p className="text-gray-600 mb-8">
            Complete your interview with our AI interviewer
          </p>
          
          <div className="h-[70vh] mb-6 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <VideoCall 
              interviewId="mock-interview"
              interviewerName="AI Interviewer"
              onEnd={handleEndInterview}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MockInterview;
