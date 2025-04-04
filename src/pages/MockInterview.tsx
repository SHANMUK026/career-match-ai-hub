
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipForward, ArrowRight, CheckCircle2, FileQuestion, Clock, Brain, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

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
  "Product Manager": [
    "How do you prioritize features in a product roadmap?",
    "Describe your process for gathering user requirements.",
    "How do you measure the success of a product feature?",
    "Tell me about a time when you had to make a difficult product decision.",
    "How do you balance business needs with user needs?"
  ],
  "Data Scientist": [
    "Explain the difference between supervised and unsupervised learning.",
    "How would you handle missing data in a dataset?",
    "Describe a situation where you used data to solve a business problem.",
    "Explain the concept of overfitting and how to prevent it.",
    "What evaluation metrics would you use for a classification problem?"
  ]
};

// Sample feedback responses
const sampleFeedback = {
  "positive": [
    "Great answer! You effectively demonstrated your knowledge.",
    "Well articulated response with clear examples.",
    "You addressed all key aspects of the question competently.",
    "Strong technical explanation that shows your expertise."
  ],
  "negative": [
    "Consider providing more specific examples in your answer.",
    "Try to be more concise while covering the key points.",
    "Make sure to address all parts of the question completely.",
    "Consider structuring your answer with a clear beginning and conclusion."
  ]
};

const MockInterview = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [interviewStarted, setInterviewStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(120); // 2 minutes per question
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [interviewHistory, setInterviewHistory] = useState<
    { date: string; role: string; score: number; questions: number }[]
  >([
    { date: "April 1, 2025", role: "Frontend Developer", score: 85, questions: 5 },
    { date: "March 28, 2025", role: "Product Manager", score: 72, questions: 5 }
  ]);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] = useState<any>(null);
  
  // Get questions based on selected role
  const getQuestions = () => {
    return selectedRole && sampleQuestions[selectedRole as keyof typeof sampleQuestions] 
      ? sampleQuestions[selectedRole as keyof typeof sampleQuestions] 
      : ["Please select a job role to see questions"];
  };
  
  const questions = getQuestions();
  
  useEffect(() => {
    // Clear any existing interval when component unmounts
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval]);
  
  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      
      setTimerInterval(interval);
      
      return () => clearInterval(interval);
    } else if (timer === 0 && isAnswering) {
      toast.warning("Time's up! Please submit your answer now.");
      setIsTimerRunning(false);
    }
  }, [isTimerRunning, timer, isAnswering]);
  
  const startInterview = () => {
    if (!selectedRole || !selectedDifficulty) {
      toast.error("Please select both a job role and difficulty level");
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
    toast.info("Recording started. You have 2 minutes to answer.");
  };
  
  const generateFeedback = () => {
    // In a real app, this would use AI to analyze the answer
    // For demo purposes, we'll randomly select feedback
    const isPositive = Math.random() > 0.3; // 70% chance of positive feedback
    const feedbackArr = isPositive ? sampleFeedback.positive : sampleFeedback.negative;
    const randomIndex = Math.floor(Math.random() * feedbackArr.length);
    return feedbackArr[randomIndex];
  };
  
  const submitAnswer = () => {
    if (userAnswer.trim().length < 10) {
      toast.error("Please provide a more detailed answer");
      return;
    }
    
    setIsTimerRunning(false);
    if (timerInterval) clearInterval(timerInterval);
    
    const generatedFeedback = generateFeedback();
    setFeedback(generatedFeedback);
    setShowFeedback(true);
    
    setCompletedQuestions([...completedQuestions, currentQuestionIndex]);
  };
  
  const moveToNextQuestion = () => {
    setUserAnswer("");
    setShowFeedback(false);
    setIsAnswering(false);
    setTimer(120);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      toast.success("Moving to next question.");
    } else {
      // Interview completed
      const newHistory = {
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        role: selectedRole,
        score: Math.floor(65 + Math.random() * 30), // Random score between 65-95
        questions: questions.length
      };
      
      setInterviewHistory([newHistory, ...interviewHistory]);
      toast.success("Interview completed! Check your feedback in the History tab.");
      setInterviewStarted(false);
    }
  };
  
  const skipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswering(false);
      setUserAnswer("");
      setShowFeedback(false);
      setTimer(120);
      toast.info("Question skipped");
    } else {
      toast.info("This is the last question");
    }
  };
  
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Mock Interview Practice</h1>
          <p className="text-gray-600 mb-8">
            Practice your interview skills with our AI-powered mock interviews
          </p>
          
          <Tabs defaultValue="interview" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="interview">Practice Interview</TabsTrigger>
              <TabsTrigger value="history">Interview History</TabsTrigger>
              <TabsTrigger value="tips">Interview Tips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="interview">
              {!interviewStarted ? (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Set Up Your Interview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Role</label>
                      <Select onValueChange={(value) => setSelectedRole(value)}>
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
                      <Select onValueChange={(value) => setSelectedDifficulty(value)}>
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
                    <Button className="bg-primary-gradient" onClick={startInterview}>
                      Start Interview
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Question {currentQuestionIndex + 1} of {questions.length}
                        </span>
                        <h2 className="text-xl font-semibold">{selectedRole} - {selectedDifficulty}</h2>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock size={16} className="mr-1" />
                        <span>{formatTimer(timer)}</span>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4 py-2 bg-gray-50 mb-4">
                      <p className="text-lg">{questions[currentQuestionIndex]}</p>
                    </div>
                    
                    {isTimerRunning && (
                      <div className="mb-4">
                        <Progress value={(timer / 120) * 100} className="h-2" />
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Your Answer</label>
                      <Textarea 
                        placeholder="Type your answer here..." 
                        className="min-h-[150px]"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={!isAnswering || showFeedback}
                      />
                    </div>
                    
                    {showFeedback && (
                      <div className="mb-4 bg-gray-50 p-4 rounded-lg border">
                        <h3 className="font-medium mb-2 flex items-center">
                          <Brain className="mr-2 text-primary" size={18} />
                          AI Feedback
                        </h3>
                        <p className="text-gray-700">{feedback}</p>
                        <div className="flex justify-end mt-3 space-x-2">
                          <Button variant="outline" size="sm" className="text-green-600">
                            <ThumbsUp size={14} className="mr-1" />
                            Helpful
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <ThumbsDown size={14} className="mr-1" />
                            Not Helpful
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <div className="space-x-2">
                        {!isAnswering && !showFeedback ? (
                          <Button onClick={startAnswering}>
                            <Play className="mr-2" size={16} />
                            Start Answering
                          </Button>
                        ) : !showFeedback ? (
                          <Button onClick={submitAnswer} className="bg-primary-gradient">
                            <CheckCircle2 className="mr-2" size={16} />
                            Submit Answer
                          </Button>
                        ) : (
                          <Button onClick={moveToNextQuestion} className="bg-primary-gradient">
                            <ArrowRight className="mr-2" size={16} />
                            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Interview"}
                          </Button>
                        )}
                        
                        {!showFeedback && (
                          <Button variant="outline" onClick={skipQuestion}>
                            <SkipForward className="mr-2" size={16} />
                            Skip Question
                          </Button>
                        )}
                      </div>
                      
                      <Button variant="destructive" onClick={() => setInterviewStarted(false)}>
                        End Interview
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="font-semibold mb-3">Progress</h3>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                      {questions.map((_, index) => (
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
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Interview History</h2>
                
                {interviewHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <FileQuestion size={48} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500">You haven't completed any interviews yet</p>
                    <Button className="mt-4" onClick={() => document.querySelector('[value="interview"]')?.dispatchEvent(new Event('click'))}>
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
            </TabsContent>
            
            <TabsContent value="tips">
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MockInterview;
