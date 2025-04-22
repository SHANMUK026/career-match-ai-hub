
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoCall from '@/components/interviews/VideoCall';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, UserPlus, AlertCircle, Info, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MockInterview = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [interviewType, setInterviewType] = useState<'ai' | 'human'>('ai');
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  
  // Check camera permissions
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setCameraPermission(true);
      } catch (error) {
        console.error("Camera/microphone permission denied:", error);
        setCameraPermission(false);
      }
    };
    
    checkPermissions();
  }, []);

  const handleEndInterview = () => {
    // Handle interview completion
    setIsStarted(false);
    toast.success('Interview ended successfully');
  };

  const startInterview = () => {
    if (cameraPermission === false) {
      toast.error("Camera and microphone access is required for interviews");
      return;
    }
    
    setIsStarted(true);
    toast.success(`Starting ${interviewType === 'ai' ? 'AI' : 'human'} interview`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {!isStarted ? (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold mb-2">Video Interviews</h1>
              <p className="text-gray-600">
                Practice with our AI interviewer or connect with real recruiters
              </p>
              
              {cameraPermission === false && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Permission Required</AlertTitle>
                  <AlertDescription>
                    Camera and microphone access is required for interviews. Please enable permissions in your browser settings.
                  </AlertDescription>
                </Alert>
              )}
              
              <Tabs defaultValue="ai" onValueChange={(value) => setInterviewType(value as 'ai' | 'human')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ai">AI Interview</TabsTrigger>
                  <TabsTrigger value="human">Human Interview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ai" className="space-y-4">
                  <Card className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <PlayCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-1">AI Mock Interview</h2>
                        <p className="text-gray-600">Practice with our AI interviewer to improve your skills</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Features</h3>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center">
                            <span className="bg-green-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                            Realistic interview questions
                          </li>
                          <li className="flex items-center">
                            <span className="bg-green-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                            Real-time feedback on responses
                          </li>
                          <li className="flex items-center">
                            <span className="bg-green-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                            Practice at your own pace
                          </li>
                          <li className="flex items-center">
                            <span className="bg-green-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                            Interview recording and analysis
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Industries</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Tech</span>
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Finance</span>
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Healthcare</span>
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Marketing</span>
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Sales</span>
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Customer Service</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-primary-gradient"
                      onClick={startInterview}
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start AI Interview
                    </Button>
                  </Card>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Preparation Tip</AlertTitle>
                    <AlertDescription>
                      Find a quiet space with good lighting before starting your interview.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
                
                <TabsContent value="human" className="space-y-4">
                  <Card className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <UserPlus className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-1">Human Interview</h2>
                        <p className="text-gray-600">Connect with professional recruiters for real interview practice</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Benefits</h3>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center">
                            <span className="bg-green-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                            Personalized feedback from professionals
                          </li>
                          <li className="flex items-center">
                            <span className="bg-green-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                            Network with industry experts
                          </li>
                          <li className="flex items-center">
                            <span className="bg-green-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                            Real interview conditions
                          </li>
                          <li className="flex items-center">
                            <span className="bg-green-500 rounded-full h-1.5 w-1.5 mr-2"></span>
                            Follow-up career advice
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Availability</h3>
                        <p className="text-sm text-gray-600">
                          Interviews available:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs">Today (3)</span>
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Tomorrow (5)</span>
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">This Week (12)</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-primary-gradient"
                      onClick={startInterview}
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Start Human Interview
                    </Button>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold mb-2">
                {interviewType === 'ai' ? 'AI Mock Interview' : 'Human Interview'}
              </h1>
              <p className="text-gray-600 mb-8">
                {interviewType === 'ai' 
                  ? 'Complete your interview with our AI interviewer' 
                  : 'You are connected with a professional interviewer'}
              </p>
              
              <div className="h-[70vh] mb-6 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <VideoCall 
                  interviewId={interviewType === 'ai' ? 'ai-mock-interview' : 'human-interview'}
                  interviewerName={interviewType === 'ai' ? 'AI Interviewer' : 'Professional Interviewer'}
                  onEnd={handleEndInterview}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MockInterview;
