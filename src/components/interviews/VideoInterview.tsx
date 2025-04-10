
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIInterviewer from './AIInterviewer';
import AIInterviewHelper from './AIInterviewHelper';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  Mic, 
  MicOff, 
  CameraOff, 
  Play, 
  Pause, 
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface VideoInterviewProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
}

type InterviewState = 'setup' | 'intro' | 'questions' | 'feedback' | 'complete';

const VideoInterview: React.FC<VideoInterviewProps> = ({ jobId, jobTitle, companyName }) => {
  const [interviewState, setInterviewState] = useState<InterviewState>('setup');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  
  // Load AI enabled setting from localStorage on component mount
  useEffect(() => {
    const aiEnabledSetting = localStorage.getItem('aiEnabled');
    if (aiEnabledSetting !== null) {
      setAiEnabled(aiEnabledSetting === 'true');
    }
  }, []);
  
  const questions = [
    `Tell me about your experience with technologies required for the ${jobTitle} position.`,
    `Can you describe a challenging project you've worked on and how you overcame obstacles?`,
    `How do you stay updated with the latest trends and technologies in your field?`,
    `Why are you interested in working at ${companyName}?`,
    `What are your salary expectations for this role?`
  ];
  
  const aiResponses = [
    "That's great to hear about your experience! Your technical skills seem well-aligned with what we're looking for. Could you also share a specific example of how you've applied these technologies in a professional setting?",
    "Thank you for sharing that experience! Your approach to problem-solving demonstrates resourcefulness. How did this project impact the business or organization you were working with?",
    "It's excellent to see your commitment to professional development. Are there any particular resources or communities you find most valuable for staying current?",
    "I appreciate your interest in our company. It sounds like you've done your research on our values and mission. How do you see yourself contributing to our team culture?",
    "Thanks for sharing your expectations. This aligns with the range we've budgeted for this role. We'd also like to highlight our comprehensive benefits package including healthcare, retirement plans, and professional development opportunities."
  ];
  
  useEffect(() => {
    if (interviewState === 'intro' && !stream) {
      setupCamera();
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [interviewState]);
  
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  
  const setupCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setStream(mediaStream);
      toast.success("Camera and microphone connected successfully");
    } catch (err) {
      console.error("Error accessing media devices:", err);
      toast.error("Failed to access camera or microphone. Please check permissions.");
    }
  };
  
  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
      toast.info(isMuted ? "Microphone unmuted" : "Microphone muted");
    }
  };
  
  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(!isCameraOff);
      toast.info(isCameraOff ? "Camera turned on" : "Camera turned off");
    }
  };
  
  const startInterview = () => {
    setInterviewState('intro');
  };
  
  const startAnswering = () => {
    setIsRecording(true);
    toast.info("Recording started. Please answer the question.");
  };
  
  const finishAnswering = () => {
    setIsRecording(false);
    setShowAIResponse(true);
    toast.success("Answer recorded successfully!");
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAIResponse(false);
      setUserAnswer('');
    } else {
      setInterviewState('feedback');
    }
  };
  
  const completeInterview = () => {
    setInterviewState('complete');
    toast.success("Interview completed successfully! Your application has been submitted.");
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-lg border-gray-200 dark:border-gray-700">
        {/* Show AI Interview Helper at the top of all interview states when AI is enabled */}
        {aiEnabled && <AIInterviewHelper isActive={true} />}
        
        {interviewState === 'setup' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-readable">AI-Powered Video Interview</h2>
              <p className="text-readable-secondary max-w-2xl mx-auto">
                Complete a brief video interview with our AI assistant. This helps us understand your experience and skills better. The interview consists of {questions.length} questions and takes about 10-15 minutes.
              </p>
            </div>
            
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <HelpCircle className="h-4 w-4 text-blue-500" />
              <AlertTitle className="text-blue-700 dark:text-blue-300">Preparation Tips</AlertTitle>
              <AlertDescription className="text-blue-600 dark:text-blue-400">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Find a quiet place with good lighting</li>
                  <li>Make sure your camera and microphone are working</li>
                  <li>Dress professionally as you would for an in-person interview</li>
                  <li>Prepare notes on your experience and skills (though try not to read from them)</li>
                  <li>Have a glass of water nearby</li>
                </ul>
              </AlertDescription>
            </Alert>
            
            <Tabs defaultValue="how-it-works" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
                <TabsTrigger value="technology-check">Technology Check</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="how-it-works" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold mb-2 text-readable">The AI Interview Process</h3>
                <ol className="list-decimal pl-5 space-y-2 text-readable-secondary">
                  <li>Our AI interviewer will ask you {questions.length} questions about your experience and skills</li>
                  <li>You'll record your answers using your webcam and microphone</li>
                  <li>The AI will provide feedback and follow-up questions</li>
                  <li>Your responses are analyzed for relevant skills and experience</li>
                  <li>At the end, you'll receive a summary and next steps</li>
                </ol>
              </TabsContent>
              <TabsContent value="technology-check" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold mb-2 text-readable">System Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 text-readable-secondary">
                  <li>Webcam and microphone</li>
                  <li>Chrome, Firefox, or Edge browser (latest version)</li>
                  <li>Stable internet connection</li>
                  <li>Well-lit environment</li>
                </ul>
                <Button className="mt-4" onClick={setupCamera}>
                  Test Your Camera & Microphone
                </Button>
              </TabsContent>
              <TabsContent value="faq" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold mb-2 text-readable">Frequently Asked Questions</h3>
                <div className="space-y-3 text-readable-secondary">
                  <div>
                    <h4 className="font-medium">Is this interview recorded?</h4>
                    <p className="text-sm">Yes, your responses are recorded and reviewed by our hiring team.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Can I retry a question?</h4>
                    <p className="text-sm">Unfortunately, just like in a real interview, each question can only be answered once.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">How is my data protected?</h4>
                    <p className="text-sm">Your interview is encrypted and stored securely, accessible only to the hiring team.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center pt-4">
              <Button 
                className="bg-primary-gradient text-white px-8 py-6 text-lg"
                onClick={startInterview}
              >
                <Play className="mr-2" size={20} />
                Start Interview
              </Button>
            </div>
          </div>
        )}
        
        {interviewState === 'intro' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4 text-readable text-center">Welcome to your interview for {jobTitle}</h2>
            <p className="text-readable-secondary text-center mb-6">
              I'm your AI interviewer today. I'll be asking you a few questions about your experience and skills. 
              Let's start with a brief introduction to help you get comfortable.
            </p>
            
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative mb-4">
              {isCameraOff ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CameraOff size={48} className="text-gray-400" />
                  <p className="absolute bottom-10 text-gray-500">Camera is off</p>
                </div>
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover"
                />
              )}
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-4">
                <Button 
                  onClick={toggleMute} 
                  variant="secondary" 
                  className="rounded-full w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900"
                >
                  {isMuted ? (
                    <MicOff className="h-5 w-5 text-red-500" />
                  ) : (
                    <Mic className="h-5 w-5 text-green-500" />
                  )}
                </Button>
                <Button 
                  onClick={toggleCamera}
                  variant="secondary"
                  className="rounded-full w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900"
                >
                  {isCameraOff ? (
                    <CameraOff className="h-5 w-5 text-red-500" />
                  ) : (
                    <Video className="h-5 w-5 text-green-500" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-readable-secondary mb-6">
                When you're ready to start the interview, click the button below. 
                Make sure your camera and microphone are working properly.
              </p>
              
              <Button 
                className="bg-primary-gradient text-white px-8"
                onClick={() => setInterviewState('questions')}
              >
                Begin Interview Questions
              </Button>
            </div>
          </div>
        )}
        
        {interviewState === 'questions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-readable">Question {currentQuestion + 1}/{questions.length}</h2>
              <div className="text-sm text-gray-500">
                {isRecording ? (
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                    Recording
                  </span>
                ) : (
                  <span>Ready</span>
                )}
              </div>
            </div>
            
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="w-full lg:w-1/2">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative mb-4">
                  {isCameraOff ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CameraOff size={48} className="text-gray-400" />
                      <p className="absolute bottom-10 text-gray-500">Camera is off</p>
                    </div>
                  ) : (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-4">
                    <Button 
                      onClick={toggleMute} 
                      variant="secondary" 
                      className="rounded-full w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900"
                    >
                      {isMuted ? (
                        <MicOff className="h-5 w-5 text-red-500" />
                      ) : (
                        <Mic className="h-5 w-5 text-green-500" />
                      )}
                    </Button>
                    <Button 
                      onClick={toggleCamera}
                      variant="secondary"
                      className="rounded-full w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900"
                    >
                      {isCameraOff ? (
                        <CameraOff className="h-5 w-5 text-red-500" />
                      ) : (
                        <Video className="h-5 w-5 text-green-500" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-100 dark:border-blue-900 mb-4">
                  <p className="text-readable font-medium">{questions[currentQuestion]}</p>
                </div>
                
                <div className="space-y-4">
                  {!isRecording && !showAIResponse && (
                    <Button 
                      className="bg-primary-gradient text-white w-full"
                      onClick={startAnswering}
                    >
                      <Play className="mr-2" size={16} />
                      Start Recording Answer
                    </Button>
                  )}
                  
                  {isRecording && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Type your answer here (optional - for reference only)"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={finishAnswering}
                      >
                        <Pause className="mr-2" size={16} />
                        Stop Recording
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <AnimatePresence>
                  {showAIResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                        <AIInterviewer />
                        <div>
                          <h3 className="font-medium text-readable mb-1">AI Interviewer Feedback</h3>
                          <p className="text-readable-secondary text-sm">
                            {aiEnabled ? aiResponses[currentQuestion] : "AI feedback is currently disabled. Enable AI in settings to receive feedback."}
                          </p>
                          
                          <div className="flex justify-end space-x-2 mt-3">
                            <Button variant="outline" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful
                            </Button>
                            <Button variant="outline" size="sm">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Not Helpful
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Textarea
                        placeholder="Add a follow-up comment (optional)"
                        className="min-h-[100px]"
                      />
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">
                          <Send className="h-4 w-4 mr-1" />
                          Send Follow-up
                        </Button>
                        <Button className="bg-primary-gradient" onClick={nextQuestion}>
                          {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Interview"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
        
        {interviewState === 'feedback' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-readable">Interview Complete!</h2>
              <p className="text-readable-secondary">
                Thank you for completing the video interview for the {jobTitle} position at {companyName}.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-2">AI Interview Summary</h3>
              <p className="text-green-700 dark:text-green-500 mb-4">
                Based on your responses, here's a quick summary of your interview:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                    <ThumbsUp className="h-4 w-4 text-green-700 dark:text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-400">Technical Skills</p>
                    <p className="text-green-700 dark:text-green-500 text-sm">
                      You demonstrated strong technical knowledge relevant to the position.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                    <ThumbsUp className="h-4 w-4 text-green-700 dark:text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-400">Communication</p>
                    <p className="text-green-700 dark:text-green-500 text-sm">
                      Your communication was clear and professional.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                    <ThumbsUp className="h-4 w-4 text-green-700 dark:text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-400">Experience</p>
                    <p className="text-green-700 dark:text-green-500 text-sm">
                      You shared relevant experience that aligns with the job requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-readable-secondary mb-6">
                Your interview responses will be reviewed by our hiring team. You'll receive an email with next steps within 5-7 business days.
              </p>
              
              <Button 
                className="bg-primary-gradient text-white px-8"
                onClick={completeInterview}
              >
                Complete Application
              </Button>
            </div>
          </div>
        )}
        
        {interviewState === 'complete' && (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ThumbsUp className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-4 text-readable">Application Submitted!</h2>
            <p className="text-readable-secondary max-w-md mx-auto mb-8">
              Thank you for applying for the {jobTitle} position at {companyName}. 
              Your application and video interview have been submitted successfully.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 p-6 rounded-lg mb-6 max-w-md mx-auto">
              <h3 className="font-medium text-blue-800 dark:text-blue-400 mb-2">What happens next?</h3>
              <ol className="text-left list-decimal pl-5 text-blue-700 dark:text-blue-500 space-y-1">
                <li>Our team will review your application and interview</li>
                <li>You'll receive an email confirmation shortly</li>
                <li>If selected, we'll contact you for the next round</li>
                <li>The entire process typically takes 1-2 weeks</li>
              </ol>
            </div>
            
            <Button 
              className="bg-primary-gradient text-white px-8"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VideoInterview;
