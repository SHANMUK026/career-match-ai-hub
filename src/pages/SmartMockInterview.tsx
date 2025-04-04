
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Play, 
  Pause, 
  SkipForward, 
  ArrowRight, 
  CheckCircle2, 
  FileQuestion, 
  Clock,
  MessageSquare,
  User,
  ThumbsUp,
  ThumbsDown,
  BarChart,
  Gift
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Enhanced interview question data with follow-up questions based on responses
const interviewData = {
  "Frontend Developer": {
    beginner: [
      {
        id: 1,
        question: "Can you explain the difference between let, const, and var in JavaScript?",
        keyPoints: ["Block scope vs function scope", "Hoisting behavior", "Reassignment capabilities"],
        followUpGood: "That's a solid understanding. How might you use these differently in your projects?",
        followUpBad: "Let's dive deeper. Can you provide an example where using let instead of var would prevent a bug?",
        additionalQuestions: [
          "How would you explain closures in JavaScript?",
          "What is the event loop and how does it work in JavaScript?"
        ]
      },
      {
        id: 2,
        question: "What is the virtual DOM in React and why is it important?",
        keyPoints: ["In-memory representation", "Performance optimization", "Reconciliation"],
        followUpGood: "Great explanation. How does the reconciliation process work in React?",
        followUpBad: "Let's explore this further. Can you explain how React decides which components to re-render?",
        additionalQuestions: [
          "What are React Hooks and why were they introduced?",
          "What is JSX and why does React use it?"
        ]
      }
    ],
    intermediate: [
      {
        id: 1,
        question: "Explain how you would implement state management in a complex React application.",
        keyPoints: ["Context API", "Redux/MobX", "Component composition", "Custom hooks"],
        followUpGood: "Excellent! How would you decide between using Redux vs. Context API?",
        followUpBad: "Let's consider some specific scenarios. When would you choose to use Redux over React's built-in state management?",
        additionalQuestions: [
          "How do you optimize performance in React applications?",
          "What are your thoughts on server components in React?"
        ]
      },
      {
        id: 2,
        question: "Describe your experience with TypeScript and how it improves your development workflow.",
        keyPoints: ["Type safety", "Better tooling", "Self-documenting code", "Interface definitions"],
        followUpGood: "That's very insightful. How do you handle complex type definitions?",
        followUpBad: "Could you give an example of how TypeScript has helped you identify bugs during development?",
        additionalQuestions: [
          "How do you approach generics in TypeScript?",
          "What's your approach to type vs. interface in TypeScript?"
        ]
      }
    ],
    advanced: [
      {
        id: 1,
        question: "Describe a complex technical challenge you faced in a frontend project and how you solved it.",
        keyPoints: ["Problem identification", "Methodical approach", "Technical solution", "Results/impact"],
        followUpGood: "That's impressive. What alternative approaches did you consider?",
        followUpBad: "Interesting approach. If you had to tackle this problem again, what would you do differently?",
        additionalQuestions: [
          "How do you approach micro-frontend architecture?",
          "Tell me about your experience with WebAssembly or progressive web apps."
        ]
      },
      {
        id: 2,
        question: "How do you approach performance optimization in modern web applications?",
        keyPoints: ["Bundle size optimization", "Lazy loading", "Rendering performance", "Caching strategies", "Metrics and monitoring"],
        followUpGood: "Excellent answer. How do you measure the effectiveness of your optimizations?",
        followUpBad: "Let's go deeper. Can you describe how you would identify performance bottlenecks?",
        additionalQuestions: [
          "What's your experience with service workers and offline capabilities?",
          "How do you optimize for Core Web Vitals?"
        ]
      }
    ]
  },
  "Product Manager": {
    beginner: [
      {
        id: 1,
        question: "How do you prioritize features in a product roadmap?",
        keyPoints: ["User impact", "Business value", "Effort estimation", "Strategy alignment"],
        followUpGood: "Great approach. How do you communicate priorities to stakeholders?",
        followUpBad: "What frameworks or methods do you use to evaluate feature prioritization?",
        additionalQuestions: [
          "How do you gather user requirements?",
          "How do you handle competing priorities from different stakeholders?"
        ]
      }
    ],
    intermediate: [
      {
        id: 1,
        question: "Describe a situation where you had to make a difficult product decision with limited data.",
        keyPoints: ["Decision-making process", "Risk assessment", "Stakeholder management", "Outcome evaluation"],
        followUpGood: "That's a great example. How did you evaluate the success of your decision afterward?",
        followUpBad: "Interesting situation. What could you have done to gather more data before making the decision?",
        additionalQuestions: [
          "How do you balance business needs with user needs?",
          "How do you approach A/B testing for feature validation?"
        ]
      }
    ],
    advanced: [
      {
        id: 1,
        question: "How do you measure the success of a product feature after launch?",
        keyPoints: ["Success metrics definition", "Analytics implementation", "User feedback loops", "Iteration strategy"],
        followUpGood: "Excellent strategy. How do you decide when to iterate versus pivot on a feature?",
        followUpBad: "How do you distinguish between correlation and causation when analyzing feature metrics?",
        additionalQuestions: [
          "Tell me about a time when you had to kill a feature that wasn't performing well.",
          "How do you align product metrics with company OKRs?"
        ]
      }
    ]
  }
};

const SmartMockInterview = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [interviewStarted, setInterviewStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(120); // 2 minutes per question
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [isFollowUp, setIsFollowUp] = useState<boolean>(false);
  const [followUpQuestion, setFollowUpQuestion] = useState<string>("");
  const [feedback, setFeedback] = useState<any>(null);
  const [interviewComplete, setInterviewComplete] = useState<boolean>(false);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  
  // Reference to track active interval
  const timerRef = useRef<any>(null);
  
  // Get questions based on selected role and difficulty
  const getQuestions = () => {
    if (!selectedRole || !selectedDifficulty || !interviewData[selectedRole as keyof typeof interviewData]) {
      return [];
    }
    
    return interviewData[selectedRole as keyof typeof interviewData][selectedDifficulty.toLowerCase() as keyof typeof interviewData[keyof typeof interviewData]] || [];
  };
  
  const questions = getQuestions();
  
  useEffect(() => {
    if (interviewStarted && isAnswering) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            toast.warning("Time's up! Please finish your answer.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timerRef.current);
  }, [interviewStarted, isAnswering]);
  
  useEffect(() => {
    if (interviewStarted && !isFollowUp && questions.length > 0) {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [interviewStarted, currentQuestionIndex, questions, isFollowUp]);
  
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
    setIsFollowUp(false);
    setFollowUpQuestion("");
    setFeedback(null);
    setInterviewComplete(false);
    setSessionScore(0);
    toast.success("Interview started! Take your time to think before answering.");
  };
  
  const startAnswering = () => {
    setIsAnswering(true);
    setTimer(120);
    toast.info("Recording started. You have 2 minutes to answer.");
    
    // Focus the textarea
    if (answerRef.current) {
      answerRef.current.focus();
    }
  };
  
  const evaluateAnswer = (answer: string) => {
    // This is a simplified version. In a real app, this would use AI to analyze the answer
    if (!currentQuestion) return null;
    
    // Check if answer contains key points (simplified)
    const keyPointsMentioned = currentQuestion.keyPoints.filter((point: string) => 
      answer.toLowerCase().includes(point.toLowerCase())
    ).length;
    
    const percentageScore = Math.min(100, Math.round((keyPointsMentioned / currentQuestion.keyPoints.length) * 100));
    const isGoodAnswer = percentageScore >= 60;
    
    return {
      score: percentageScore,
      isGood: isGoodAnswer,
      feedback: isGoodAnswer ? 
        `Strong answer! You covered ${keyPointsMentioned} out of ${currentQuestion.keyPoints.length} key points.` : 
        `Your answer could be stronger. You only covered ${keyPointsMentioned} out of ${currentQuestion.keyPoints.length} key points.`,
      improvement: isGoodAnswer ? 
        "Consider adding more specific examples from your experience." : 
        `Try to include more about: ${currentQuestion.keyPoints.join(", ")}`,
      followUp: isGoodAnswer ? currentQuestion.followUpGood : currentQuestion.followUpBad
    };
  };
  
  const submitAnswer = () => {
    if (userAnswer.trim().length < 10) {
      toast.error("Please provide a more detailed answer");
      return;
    }
    
    clearInterval(timerRef.current);
    
    // Evaluate the answer
    const evaluation = evaluateAnswer(userAnswer);
    setFeedback(evaluation);
    setSessionScore(prev => prev + (evaluation?.score || 0));
    
    if (!isFollowUp) {
      // Show follow-up question
      setIsFollowUp(true);
      setFollowUpQuestion(evaluation?.followUp || "");
      setCompletedQuestions([...completedQuestions, currentQuestionIndex]);
    } else {
      // Move to next question or end interview
      setIsFollowUp(false);
      setFollowUpQuestion("");
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        toast.success("Moving to next question.");
      } else {
        setInterviewComplete(true);
        toast.success("Interview completed! Check your feedback.");
      }
    }
    
    setUserAnswer("");
    setIsAnswering(false);
  };
  
  const skipQuestion = () => {
    clearInterval(timerRef.current);
    
    if (isFollowUp) {
      setIsFollowUp(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setInterviewComplete(true);
      }
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setInterviewComplete(true);
      }
    }
    
    setFollowUpQuestion("");
    setIsAnswering(false);
    setUserAnswer("");
    toast.info("Question skipped");
  };
  
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getTimerColor = () => {
    if (timer <= 30) return "text-red-500";
    if (timer <= 60) return "text-amber-500";
    return "text-gray-500";
  };
  
  const getFeedbackColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };
  
  const renderInterviewComplete = () => (
    <Card className="p-6">
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Interview Completed!</h2>
        <p className="text-gray-600 mb-6">
          You've completed the {selectedDifficulty.toLowerCase()} level {selectedRole} mock interview. Here's your feedback.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold">{Math.round(sessionScore / questions.length)}</span>
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#f3f4f6" 
                strokeWidth="8"
              />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke={`${sessionScore / questions.length >= 80 ? "#10b981" : sessionScore / questions.length >= 60 ? "#f59e0b" : "#ef4444"}`} 
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 45 * sessionScore / 100 / questions.length} ${2 * Math.PI * 45 * (1 - sessionScore / 100 / questions.length)}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <ThumbsUp className="h-4 w-4 text-green-600 mr-2" />
              Strengths
            </h3>
            <ul className="text-sm text-left list-disc pl-5 space-y-1">
              <li>Clear articulation of technical concepts</li>
              <li>Good use of specific examples</li>
              <li>Structured responses</li>
              <li>Demonstrated problem-solving approach</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <ThumbsDown className="h-4 w-4 text-amber-600 mr-2" />
              Areas to Improve
            </h3>
            <ul className="text-sm text-left list-disc pl-5 space-y-1">
              <li>Provide more depth on technical implementations</li>
              <li>Quantify impact in your examples</li>
              <li>Address edge cases in your solutions</li>
              <li>Be more concise in your responses</li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          {questions.map((q, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 text-left">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{q.question}</h4>
                <Badge className={sessionScore / questions.length >= 70 ? "bg-green-500" : "bg-amber-500"}>
                  {Math.round(sessionScore / questions.length)}%
                </Badge>
              </div>
              {/* Simplified feedback */}
              <p className="text-sm text-gray-600 mt-2">
                {index % 2 === 0 ? 
                  "Good answer with solid examples. Consider adding more specific technical details." :
                  "Your answer covered the main points but could be enhanced with more real-world examples."}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <Button onClick={() => {
            setInterviewStarted(false);
            setFeedback(null);
            setInterviewComplete(false);
          }}>
            Start New Interview
          </Button>
          <Button variant="outline" onClick={() => navigate('/mock-interview')}>
            Change Settings
          </Button>
          <Button variant="outline" className="flex items-center" onClick={() => toast.success("Report generated and available in your dashboard")}>
            <BarChart className="h-4 w-4 mr-2" />
            Generate Full Report
          </Button>
        </div>
      </div>
    </Card>
  );
  
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl font-bold mb-2">AI Mock Interview Practice</h1>
          <p className="text-gray-600 mb-8">
            Practice your interview skills with our AI-powered mock interviews that adapt to your responses
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
                          {Object.keys(interviewData).map(role => (
                            <SelectItem key={role} value={role}>
                              {role}
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
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Interview Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <MessageSquare className="h-5 w-5 text-primary mb-2" />
                        <h4 className="font-medium mb-1">Adaptive Questions</h4>
                        <p className="text-sm text-gray-600">Follow-up questions based on your responses</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <User className="h-5 w-5 text-primary mb-2" />
                        <h4 className="font-medium mb-1">Personalized Feedback</h4>
                        <p className="text-sm text-gray-600">Get detailed analysis of your answers</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <Gift className="h-5 w-5 text-primary mb-2" />
                        <h4 className="font-medium mb-1">Interview Tips</h4>
                        <p className="text-sm text-gray-600">Receive suggestions to improve your responses</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-primary-gradient" onClick={startInterview}>
                      Start Interview
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </Card>
              ) : interviewComplete ? (
                renderInterviewComplete()
              ) : (
                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          {isFollowUp ? "Follow-up" : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
                        </span>
                        <h2 className="text-xl font-semibold">{selectedRole} - {selectedDifficulty}</h2>
                      </div>
                      <div className={`flex items-center ${getTimerColor()}`}>
                        <Clock size={16} className="mr-1" />
                        <span>{formatTimer(timer)}</span>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4 py-3 bg-gray-50 mb-6">
                      <p className="text-lg">
                        {isFollowUp ? followUpQuestion : currentQuestion?.question}
                      </p>
                    </div>
                    
                    {feedback && (
                      <div className={`mb-6 p-4 rounded-lg ${feedback.isGood ? 'bg-green-50' : 'bg-amber-50'}`}>
                        <h3 className={`font-medium mb-2 ${getFeedbackColor(feedback.score)}`}>
                          Answer Feedback
                        </h3>
                        <p className="text-gray-700 mb-2">{feedback.feedback}</p>
                        <p className="text-sm text-gray-600">{feedback.improvement}</p>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Your Answer</label>
                      <Textarea 
                        ref={answerRef}
                        placeholder="Type your answer here..." 
                        className="min-h-[150px]"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={!isAnswering}
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="space-x-2">
                        {!isAnswering ? (
                          <Button onClick={startAnswering}>
                            <Play className="mr-2" size={16} />
                            Start Answering
                          </Button>
                        ) : (
                          <Button onClick={submitAnswer} className="bg-primary-gradient">
                            <CheckCircle2 className="mr-2" size={16} />
                            Submit Answer
                          </Button>
                        )}
                        
                        <Button variant="outline" onClick={skipQuestion}>
                          <SkipForward className="mr-2" size={16} />
                          Skip {isFollowUp ? "Follow-up" : "Question"}
                        </Button>
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
                            index === currentQuestionIndex && !isFollowUp
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
                <div className="text-center py-8">
                  <FileQuestion size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500">You haven't completed any interviews yet</p>
                  <Button className="mt-4" onClick={() => document.querySelector('[value="interview"]')?.dispatchEvent(new Event('click'))}>
                    Start Your First Interview
                  </Button>
                </div>
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

export default SmartMockInterview;
