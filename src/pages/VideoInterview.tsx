import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoCall from '@/components/interviews/VideoCall';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Building, User, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const VideoInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [callStarted, setCallStarted] = useState(false);
  const [apiKeyExists, setApiKeyExists] = useState(false);
  
  useEffect(() => {
    const savedApiKey = localStorage.getItem('interviewAIApiKey');
    setApiKeyExists(!!savedApiKey);
  }, []);
  
  const interviewData = {
    id: id || '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    interviewer: 'Sarah Johnson',
    role: 'Hiring Manager',
    date: 'April 5, 2025',
    time: '10:00 AM - 11:00 AM',
    status: 'Scheduled',
    description: 'This interview will focus on assessing your technical skills and experience with React and modern JavaScript frameworks. Please be prepared to discuss your past projects and problem-solving abilities.'
  };
  
  const startCall = () => {
    if (!apiKeyExists) {
      toast.warning('For the full AI interview experience, please add your API key in Interview AI Settings first.');
    }
    
    setCallStarted(true);
    toast.success('Joining interview call...');
  };
  
  const endCall = () => {
    setCallStarted(false);
    toast.success('Interview completed');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          {!callStarted ? (
            <>
              <Button 
                variant="ghost" 
                className="mb-6"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="mr-2" size={18} />
                Back to Dashboard
              </Button>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-2">Video Interview: {interviewData.jobTitle}</h1>
                    <div className="flex items-center text-gray-600 mb-6">
                      <Building className="mr-2" size={18} />
                      <span>{interviewData.company}</span>
                    </div>
                    
                    {!apiKeyExists && (
                      <Alert variant="default" className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        <div>
                          <AlertTitle className="text-yellow-800 dark:text-yellow-300">AI Key Required</AlertTitle>
                          <AlertDescription className="text-yellow-700 dark:text-yellow-400">
                            For the full AI interview experience, please add your API key in Interview AI Settings.
                          </AlertDescription>
                        </div>
                      </Alert>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center">
                          <Calendar className="text-gray-500 mr-3" size={20} />
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">{interviewData.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="text-gray-500 mr-3" size={20} />
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium">{interviewData.time}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center">
                          <User className="text-gray-500 mr-3" size={20} />
                          <div>
                            <p className="text-sm text-gray-500">Interviewer</p>
                            <p className="font-medium">{interviewData.interviewer}</p>
                            <p className="text-sm text-gray-500">{interviewData.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2">Interview Details</h3>
                    <p className="text-gray-700 mb-6">{interviewData.description}</p>
                    
                    <div className="bg-primary-gradient text-white rounded-lg p-6 mb-6">
                      <h3 className="font-semibold mb-2">Tips for Success</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Find a quiet place with good lighting and a stable internet connection</li>
                        <li>Test your camera and microphone before the interview</li>
                        <li>Dress professionally, as you would for an in-person interview</li>
                        <li>Have a copy of your resume and the job description handy</li>
                        <li>Prepare questions to ask the interviewer</li>
                      </ul>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        className="bg-primary-gradient px-8"
                        onClick={startCall}
                      >
                        Join Interview Now
                      </Button>
                    </div>
                  </Card>
                </div>
                
                <div>
                  <Card className="p-6 mb-6">
                    <h3 className="font-semibold mb-4">Interview Checklist</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center mr-3 mt-0.5">
                          <div className="w-3 h-3 bg-primary rounded-sm"></div>
                        </div>
                        <div>
                          <p className="font-medium">Research the company</p>
                          <p className="text-sm text-gray-500">Understand their products, values, and culture</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center mr-3 mt-0.5">
                          <div className="w-3 h-3 bg-primary rounded-sm"></div>
                        </div>
                        <div>
                          <p className="font-medium">Review your experience</p>
                          <p className="text-sm text-gray-500">Be ready to discuss your relevant projects</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center mr-3 mt-0.5">
                          <div className="w-3 h-3 bg-primary rounded-sm"></div>
                        </div>
                        <div>
                          <p className="font-medium">Prepare STAR examples</p>
                          <p className="text-sm text-gray-500">Situation, Task, Action, Result format</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center mr-3 mt-0.5">
                          <div className="w-3 h-3 bg-primary rounded-sm"></div>
                        </div>
                        <div>
                          <p className="font-medium">Test your equipment</p>
                          <p className="text-sm text-gray-500">Camera, microphone, and internet connection</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded border border-gray-300 mr-3 mt-0.5"></div>
                        <div>
                          <p className="font-medium">Follow up after interview</p>
                          <p className="text-sm text-gray-500">Send a thank-you email within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Need to Reschedule?</h3>
                    <p className="text-gray-700 mb-4">If you need to reschedule this interview, please do so at least 24 hours in advance.</p>
                    <Button variant="outline" className="w-full">
                      Request Reschedule
                    </Button>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="h-[80vh]">
              <VideoCall 
                interviewId={interviewData.id} 
                interviewerName={interviewData.interviewer}
                onEnd={endCall}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoInterview;
