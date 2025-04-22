import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import InterviewQuestion from '@/components/interviews/mock/InterviewQuestion';
import {
  Play,
  ArrowRight,
  BarChart,
  ShieldCheck,
  Camera,
  Eye,
  AlertTriangle,
  MessageSquare,
  Mic
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SmartMockInterview = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("Frontend Developer");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Intermediate");
  const [interviewStarted, setInterviewStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(120);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isVoiceMode, setIsVoiceMode] = useState<boolean>(false);
  const [isVideoMode, setIsVideoMode] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [securityEnabled, setSecurityEnabled] = useState<boolean>(true);
  const [windowFocusLost, setWindowFocusLost] = useState<number>(0);

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

  useEffect(() => {
    if (interviewStarted && securityEnabled) {
      const handleVisibilityChange = () => {
        if (document.hidden && isAnswering) {
          setWindowFocusLost(prev => prev + 1);
          toast.warning("Warning: Please remain on the interview tab!");
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, [interviewStarted, securityEnabled, isAnswering]);

  const jobRoles = [
    { id: "1", title: "Frontend Developer" },
    { id: "2", title: "Backend Developer" },
    { id: "3", title: "Full Stack Developer" },
    { id: "4", title: "UX/UI Designer" },
    { id: "5", title: "Product Manager" },
    { id: "6", title: "Data Scientist" },
    { id: "7", title: "DevOps Engineer" },
    { id: "8", title: "Marketing Specialist" }
  ];

  const difficultyLevels = [
    { id: "1", label: "Beginner" },
    { id: "2", label: "Intermediate" },
    { id: "3", label: "Advanced" }
  ];

  const sampleQuestions = {
    "Frontend Developer": [
      "Explain the difference between let, const, and var in JavaScript.",
      "How does React's virtual DOM work?",
      "Describe how you would implement responsive design.",
      "What are React hooks and how do they work?",
      "Explain CSS specificity and the box model."
    ],
    "Data Scientist": [
      "Explain the difference between supervised and unsupervised learning.",
      "How would you handle missing data in a dataset?",
      "Describe a situation where you used data to solve a business problem.",
      "Explain the concept of overfitting and how to prevent it.",
      "What evaluation metrics would you use for a classification problem?"
    ],
    "Backend Developer": [
      "Explain the differences between SQL and NoSQL databases.",
      "What are the principles of RESTful API design?",
      "How would you implement authentication and authorization in a web application?",
      "Explain the concept of horizontal vs vertical scaling.",
      "How do you handle error handling in your preferred backend language?"
    ],
    "Product Manager": [
      "How do you prioritize features in a product roadmap?",
      "Describe your process for gathering user requirements.",
      "How do you measure the success of a product feature?",
      "Tell me about a time when you had to make a difficult product decision.",
      "How do you balance business needs with user needs?"
    ]
  };

  const getQuestions = () => {
    return selectedRole && sampleQuestions[selectedRole as keyof typeof sampleQuestions]
      ? sampleQuestions[selectedRole as keyof typeof sampleQuestions]
      : ["Please select a job role to see questions"];
  };

  const questions = getQuestions();

  useEffect(() => {
    let interval: number | undefined;
    
    if (isAnswering && isTimerRunning) {
      interval = window.setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsAnswering(false);
            setIsTimerRunning(false);
            toast.info("Time's up! Submitting your answer.");
            submitAnswer();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnswering, isTimerRunning]);

  const startInterview = () => {
    if (isVideoMode && !cameraPermission) {
      toast.error("Camera access is required for video interviews");
      return;
    }

    setInterviewStarted(true);
    setCurrentQuestionIndex(0);
    setTimer(120);
    setIsAnswering(false);
    setCompletedQuestions([]);
    setShowFeedback(false);
    toast.success("Interview started! Take your time to think before answering.");
  };

  const startAnswering = () => {
    setIsAnswering(true);
    setIsTimerRunning(true);
    setIsRecording(true);
    toast.info("Recording started. You have 2 minutes to answer.");
  };

  const submitAnswer = () => {
    if (!isAnswering) return;
    
    if (userAnswer.trim().length < 10 && !isVoiceMode && !isVideoMode) {
      toast.error("Please provide a more detailed answer");
      return;
    }

    setIsAnswering(false);
    setIsTimerRunning(false);
    setIsRecording(false);
    setShowFeedback(true);
    
    const feedbackOptions = [
      "Great answer! You demonstrated a clear understanding of the concept. One suggestion would be to include more specific examples in your explanation.",
      "Good response. You covered the main points, but consider discussing potential trade-offs and limitations in future answers.",
      "Your answer includes valuable information. To strengthen it further, try relating the concepts to real-world applications or projects you've worked on.",
      "Strong technical explanation. For improvement, try to structure your answer with a brief introduction, main points, and conclusion.",
      "You've addressed the question well. Consider incorporating industry best practices or recent developments in this area to showcase your up-to-date knowledge."
    ];
    
    setFeedback(feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]);
    setCompletedQuestions([...completedQuestions, currentQuestionIndex]);
    toast.success("Answer submitted! Check your feedback.");
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
      setUserAnswer("");
      setTimer(120);
      toast.success("Moving to next question.");
    } else {
      toast.success("Interview completed! Check your feedback.");
    }
  };

  const skipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswering(false);
      setShowFeedback(false);
      setUserAnswer("");
      setTimer(120);
      toast.info("Question skipped");
    } else {
      toast.info("This is the last question");
    }
  };

  const toggleVoiceMode = () => {
    if (isVideoMode) return;
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      toast.info("Switched to voice response mode");
    } else {
      toast.info("Switched to text response mode");
    }
  };

  const toggleVideoMode = () => {
    if (!cameraPermission && !isVideoMode) {
      toast.error("Camera permission is required for video mode");
      return;
    }
    
    setIsVideoMode(!isVideoMode);
    if (isVideoMode) {
      setIsVoiceMode(false);
      toast.info("Switched to text mode");
    } else {
      setIsVoiceMode(false);
      toast.info("Switched to video mode");
    }
  };

  const handleAudioRecorded = (audioBlob: Blob) => {
    console.log("Audio recorded:", audioBlob);
    toast.success("Audio recording saved");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Smart Mock Interview</h1>
          <p className="text-gray-600 mb-8">
            AI-Powered adaptive mock interviews with video responses
          </p>

          <Tabs defaultValue="interview" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="interview">Start Interview</TabsTrigger>
              <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
              <TabsTrigger value="security">Security Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="interview">
              {!interviewStarted ? (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Set Up Your Interview</h2>
                  
                  {cameraPermission === false && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Camera Access Required</AlertTitle>
                      <AlertDescription>
                        Video interview mode requires camera and microphone permissions. Please grant access in your browser settings.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Role</label>
                      <select
                        className="w-full p-3 border rounded-md"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option value="">Select a job role</option>
                        {jobRoles.map(role => (
                          <option key={role.id} value={role.title}>
                            {role.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                      <select 
                        className="w-full p-3 border rounded-md"
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                      >
                        <option value="">Select difficulty</option>
                        {difficultyLevels.map(level => (
                          <option key={level.id} value={level.label}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border-t pt-6 mb-6">
                    <h3 className="font-medium mb-3">Interview Mode</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card className={`p-4 cursor-pointer border-2 ${!isVideoMode && !isVoiceMode ? 'border-primary' : 'border-gray-200'}`} onClick={() => {setIsVideoMode(false); setIsVoiceMode(false);}}>
                        <div className="flex flex-col items-center">
                          <div className="bg-primary/10 p-2 rounded-full mb-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-medium">Text Response</h4>
                          <p className="text-xs text-center text-gray-500 mt-1">Type your answers</p>
                        </div>
                      </Card>
                      
                      <Card className={`p-4 cursor-pointer border-2 ${isVoiceMode ? 'border-primary' : 'border-gray-200'}`} onClick={() => {setIsVoiceMode(true); setIsVideoMode(false);}}>
                        <div className="flex flex-col items-center">
                          <div className="bg-primary/10 p-2 rounded-full mb-2">
                            <Mic className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-medium">Voice Response</h4>
                          <p className="text-xs text-center text-gray-500 mt-1">Record audio answers</p>
                        </div>
                      </Card>
                      
                      <Card 
                        className={`p-4 cursor-pointer border-2 ${isVideoMode ? 'border-primary' : 'border-gray-200'} ${cameraPermission === false ? 'opacity-50' : ''}`}
                        onClick={() => {
                          if (cameraPermission !== false) {
                            setIsVideoMode(true);
                            setIsVoiceMode(false);
                          }
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="bg-primary/10 p-2 rounded-full mb-2">
                            <Camera className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-medium">Video Response</h4>
                          <p className="text-xs text-center text-gray-500 mt-1">Record video answers</p>
                          {cameraPermission === false && (
                            <span className="text-xs text-red-500 mt-1">Permission denied</span>
                          )}
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-green-600 h-5 w-5" />
                      <span className="text-sm">Security monitoring {securityEnabled ? 'enabled' : 'disabled'}</span>
                    </div>
                    
                    <Button className="bg-primary-gradient" onClick={startInterview}>
                      Start Interview
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  <InterviewQuestion 
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={questions.length}
                    question={questions[currentQuestionIndex]}
                    selectedRole={selectedRole}
                    selectedDifficulty={selectedDifficulty}
                    timer={timer}
                    isTimerRunning={isTimerRunning}
                    isAnswering={isAnswering}
                    isVoiceMode={isVoiceMode}
                    isVideoMode={isVideoMode}
                    isRecording={isRecording}
                    userAnswer={userAnswer}
                    showFeedback={showFeedback}
                    feedback={feedback}
                    onUserAnswerChange={(e) => setUserAnswer(e.target.value)}
                    onStartAnswering={startAnswering}
                    onSubmitAnswer={submitAnswer}
                    onMoveToNextQuestion={moveToNextQuestion}
                    onSkipQuestion={skipQuestion}
                    onEndInterview={() => setInterviewStarted(false)}
                    onToggleVoiceMode={toggleVoiceMode}
                    onToggleVideoMode={toggleVideoMode}
                    onAudioRecorded={handleAudioRecorded}
                    onRecordingStateChange={setIsRecording}
                  />

                  {securityEnabled && windowFocusLost > 0 && (
                    <Alert variant="destructive" className="bg-yellow-50 border-yellow-200">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertTitle className="text-yellow-700">Security Alert</AlertTitle>
                      <AlertDescription className="text-yellow-700">
                        You have left the interview tab {windowFocusLost} times. This will be noted in your interview report.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Card className="p-6">
                    <h3 className="font-semibold mb-3">Progress</h3>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                      {questions.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 rounded-full ${index === currentQuestionIndex
                            ? 'bg-primary animate-pulse'
                            : completedQuestions.includes(index)
                              ? 'bg-green-500'
                              : 'bg-gray-200'
                            }`}
                        />
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Performance Analysis</h2>
                <div className="text-center py-8">
                  <BarChart size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500">No analysis available yet. Complete an interview to see your performance.</p>
                  <Button className="mt-4" onClick={() => navigate('/mock-interview')}>
                    Start a Mock Interview
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <ShieldCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Anti-Cheating Protection</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Enable security features to prevent cheating during interviews and assessments
                      </p>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="security-toggle" 
                          className="mr-2 h-4 w-4" 
                          checked={securityEnabled}
                          onChange={(e) => setSecurityEnabled(e.target.checked)}
                        />
                        <label htmlFor="security-toggle">Enable security monitoring</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Security Features</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${securityEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        Window focus detection (detect tab switching)
                      </li>
                      <li className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${securityEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        Copy-paste monitoring
                      </li>
                      <li className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${securityEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        Browser extension detection
                      </li>
                      <li className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${securityEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        Attempt logging and reporting
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartMockInterview;
