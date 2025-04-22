import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ClipboardCheck,
  Timer,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  FileCheck,
  Play,
  CheckCircle,
  Eye,
  XCircle,
  MessageSquare,
  Code
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

const Assessments = () => {
  const [activeAssessment, setActiveAssessment] = useState<null | Assessment>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [userTextAnswers, setUserTextAnswers] = useState<Record<number, string>>({});
  const [timer, setTimer] = useState(0);
  const [securityViolations, setSecurityViolations] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  
  interface Assessment {
    id: number;
    title: string;
    description: string;
    duration: string;
    durationMinutes: number;
    questions: number;
    level: string;
    category: string;
    progress?: number;
  }
  
  const assessments: Assessment[] = [
    {
      id: 1,
      title: 'Frontend Development',
      description: 'Test your skills in HTML, CSS, JavaScript, and modern frameworks.',
      duration: '45 minutes',
      durationMinutes: 45,
      questions: 25,
      level: 'Intermediate',
      category: 'Tech',
      progress: 0
    },
    {
      id: 2,
      title: 'Data Science',
      description: 'Assess your knowledge in statistics, machine learning, and data visualization.',
      duration: '60 minutes',
      durationMinutes: 60,
      questions: 30,
      level: 'Advanced',
      category: 'Tech',
      progress: 80
    },
    {
      id: 3,
      title: 'UX/UI Design',
      description: 'Demonstrate your design thinking and user experience expertise.',
      duration: '40 minutes',
      durationMinutes: 40,
      questions: 20,
      level: 'All Levels',
      category: 'Design'
    },
    {
      id: 4,
      title: 'Project Management',
      description: 'Show your proficiency in project planning, execution, and resource management.',
      duration: '50 minutes',
      durationMinutes: 50,
      questions: 35,
      level: 'Intermediate',
      category: 'Management'
    },
    {
      id: 5,
      title: 'Digital Marketing',
      description: 'Prove your skills in SEO, content marketing, and social media strategy.',
      duration: '35 minutes',
      durationMinutes: 35,
      questions: 30,
      level: 'Beginner',
      category: 'Marketing'
    },
    {
      id: 6,
      title: 'DevOps Engineering',
      description: 'Validate your knowledge in CI/CD, containerization, and cloud infrastructure.',
      duration: '55 minutes',
      durationMinutes: 55,
      questions: 40,
      level: 'Advanced',
      category: 'Tech'
    }
  ];

  const sampleQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'In machine learning, what is the difference between supervised and unsupervised learning?',
      options: [
        'Supervised learning requires labeled data, while unsupervised learning does not',
        'Supervised learning is faster than unsupervised learning',
        'Unsupervised learning always produces better results',
        'Supervised learning uses neural networks, while unsupervised does not'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: 'Which CSS property is used to control the spacing between elements?',
      options: [
        'space-between',
        'margin',
        'padding',
        'gap'
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      type: 'code',
      question: 'Write a JavaScript function that checks if a string is a palindrome.',
      codeSnippet: '// Write your code here\nfunction isPalindrome(str) {\n  \n}'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'Which of the following is NOT a valid HTTP status code?',
      options: [
        '200 OK',
        '404 Not Found',
        '500 Internal Server Error',
        '600 Server Timeout'
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      type: 'text',
      question: 'Explain the concept of "responsive design" in web development and list at least three techniques used to achieve it.'
    }
  ];

  useEffect(() => {
    if (activeAssessment) {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          setSecurityViolations(prev => prev + 1);
          toast.warning("Warning: Leaving the assessment tab was detected!");
        }
      };

      const handleCopyPaste = (e: Event) => {
        e.preventDefault();
        setSecurityViolations(prev => prev + 1);
        toast.warning("Warning: Copy/paste is not allowed during assessments!");
        return false;
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("copy", handleCopyPaste);
      document.addEventListener("paste", handleCopyPaste);

      const initialTime = activeAssessment.durationMinutes * 60;
      setTimer(initialTime);

      const timerInterval = setInterval(() => {
        setTimer(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            handleSubmitAssessment();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        document.removeEventListener("copy", handleCopyPaste);
        document.removeEventListener("paste", handleCopyPaste);
        clearInterval(timerInterval);
      };
    }
  }, [activeAssessment]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startAssessment = (assessment: Assessment) => {
    setActiveAssessment(assessment);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setUserTextAnswers({});
    toast.success(`Starting ${assessment.title} assessment`);
  };

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleTextAnswerChange = (questionIndex: number, text: string) => {
    setUserTextAnswers(prev => ({
      ...prev,
      [questionIndex]: text
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSubmitConfirm(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitAssessment = () => {
    toast.success("Assessment submitted successfully!");
    setActiveAssessment(null);
  };

  const isQuestionAnswered = (questionIndex: number) => {
    const question = sampleQuestions[questionIndex];
    if (question.type === 'multiple-choice') {
      return selectedAnswers[questionIndex] !== undefined;
    } else if (question.type === 'text' || question.type === 'code') {
      return userTextAnswers[questionIndex]?.trim().length > 0;
    }
    return false;
  };

  const renderQuestion = () => {
    const question = sampleQuestions[currentQuestionIndex];
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Question {currentQuestionIndex + 1} of {sampleQuestions.length}</h3>
          <div className="flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
            <Timer className="mr-2 h-4 w-4" />
            {formatTime(timer)}
          </div>
        </div>
        
        <div className="border-l-4 border-primary p-4 bg-gray-50 rounded-lg">
          <p className="text-lg">{question.question}</p>
        </div>
        
        {question.type === 'multiple-choice' && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestionIndex] === index 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleSelectAnswer(currentQuestionIndex, index)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    selectedAnswers[currentQuestionIndex] === index 
                      ? 'border-primary' 
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestionIndex] === index && (
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {question.type === 'text' && (
          <Textarea
            placeholder="Type your answer here..."
            className="min-h-[200px]"
            value={userTextAnswers[currentQuestionIndex] || ''}
            onChange={(e) => handleTextAnswerChange(currentQuestionIndex, e.target.value)}
          />
        )}
        
        {question.type === 'code' && (
          <div className="space-y-2">
            <div className="bg-gray-900 p-3 rounded-t-lg flex items-center text-gray-400 text-sm">
              <Code className="h-4 w-4 mr-2" />
              <span>Code Editor</span>
            </div>
            <Textarea
              className="font-mono min-h-[200px] bg-gray-900 text-gray-100 p-4 border-none rounded-t-none"
              value={userTextAnswers[currentQuestionIndex] || question.codeSnippet || ''}
              onChange={(e) => handleTextAnswerChange(currentQuestionIndex, e.target.value)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {!activeAssessment ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">AI-Powered Skills Assessments</h1>
                <p className="text-gray-600">Validate your skills and get matched with the perfect job opportunities</p>
              </div>
              
              <Tabs defaultValue="tech">
                <TabsList className="mb-6">
                  <TabsTrigger value="tech">Technical</TabsTrigger>
                  <TabsTrigger value="management">Management</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="marketing">Marketing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tech" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assessments.filter(a => a.category === 'Tech').map(assessment => (
                      <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-xl text-primary mb-2">{assessment.title}</h3>
                          <p className="text-gray-700 mb-4">{assessment.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.duration}
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.questions} questions
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.level}
                            </span>
                          </div>
                          
                          {assessment.progress !== undefined ? (
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{assessment.progress}%</span>
                              </div>
                              <Progress value={assessment.progress} className="h-2" />
                            </div>
                          ) : null}
                          
                          <Button 
                            className="w-full bg-primary-gradient"
                            onClick={() => startAssessment(assessment)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Take Assessment
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="management">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assessments.filter(a => a.category === 'Management').map(assessment => (
                      <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-xl text-primary mb-2">{assessment.title}</h3>
                          <p className="text-gray-700 mb-4">{assessment.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.duration}
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.questions} questions
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.level}
                            </span>
                          </div>
                          
                          <Button 
                            className="w-full bg-primary-gradient"
                            onClick={() => startAssessment(assessment)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Take Assessment
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="design">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assessments.filter(a => a.category === 'Design').map(assessment => (
                      <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-xl text-primary mb-2">{assessment.title}</h3>
                          <p className="text-gray-700 mb-4">{assessment.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.duration}
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.questions} questions
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.level}
                            </span>
                          </div>
                          
                          <Button 
                            className="w-full bg-primary-gradient"
                            onClick={() => startAssessment(assessment)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Take Assessment
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="marketing">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assessments.filter(a => a.category === 'Marketing').map(assessment => (
                      <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-xl text-primary mb-2">{assessment.title}</h3>
                          <p className="text-gray-700 mb-4">{assessment.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.duration}
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.questions} questions
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {assessment.level}
                            </span>
                          </div>
                          
                          <Button 
                            className="w-full bg-primary-gradient"
                            onClick={() => startAssessment(assessment)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Take Assessment
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="my-12">
                <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary-gradient text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                    <h3 className="font-semibold text-lg mb-2">Choose an Assessment</h3>
                    <p className="text-gray-600">Select from our wide range of skill-based assessments tailored to your profession.</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary-gradient text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                    <h3 className="font-semibold text-lg mb-2">Complete the Test</h3>
                    <p className="text-gray-600">Answer questions designed by industry experts and AI to measure your skills accurately.</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary-gradient text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                    <h3 className="font-semibold text-lg mb-2">Get Matched to Jobs</h3>
                    <p className="text-gray-600">Receive personalized job recommendations based on your assessment results.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border mb-12">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Secure Testing Environment</h3>
                    <p className="text-gray-700 mb-3">Our assessments utilize advanced security features to ensure test integrity:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        Tab switching detection
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        Screen recording prevention
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        Copy-paste monitoring
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        Browser extension detection
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        Automated proctoring using AI
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        Time limits and auto-submission
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{activeAssessment.title}</h1>
                  <p className="text-gray-600">{activeAssessment.level} • {activeAssessment.questions} questions</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center text-sm font-medium">
                    <Timer className="mr-1 h-4 w-4" />
                    {formatTime(timer)}
                  </span>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowSubmitConfirm(true)}
                  >
                    Submit Assessment
                  </Button>
                </div>
              </div>
              
              {securityViolations > 0 && (
                <Alert variant="default" className="bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-700">Security Alert</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    {securityViolations} security violation{securityViolations > 1 ? 's' : ''} detected. These will be noted in your assessment report.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 gap-6">
                <Card className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Progress</span>
                      <span className="text-sm text-gray-500">
                        Question {currentQuestionIndex + 1} of {sampleQuestions.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${((currentQuestionIndex) / sampleQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {renderQuestion()}
                  
                  <div className="flex justify-between mt-6 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center">
                      <div className="flex space-x-2 mr-3">
                        {sampleQuestions.map((_, index) => (
                          <div
                            key={index}
                            className={`w-3 h-3 rounded-full cursor-pointer ${
                              index === currentQuestionIndex 
                                ? 'bg-primary' 
                                : isQuestionAnswered(index)
                                  ? 'bg-green-500'
                                  : 'bg-gray-300'
                            }`}
                            onClick={() => setCurrentQuestionIndex(index)}
                          ></div>
                        ))}
                      </div>
                      
                      <Button
                        onClick={handleNextQuestion}
                      >
                        {currentQuestionIndex < sampleQuestions.length - 1 ? "Next" : "Finish"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
                
                <div className="bg-gray-50 p-4 rounded-lg border text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="text-yellow-600 h-4 w-4 mr-1" />
                    <span className="text-sm font-medium text-yellow-800">Proctored Exam</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    This assessment is being monitored for suspicious activity. Leaving the tab or using copy/paste will be flagged.
                  </p>
                </div>
              </div>
              
              {showSubmitConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-md w-full">
                    <h3 className="text-xl font-bold mb-4">Submit Assessment?</h3>
                    <p className="text-gray-700 mb-6">
                      You have answered {Object.keys(selectedAnswers).length + Object.keys(userTextAnswers).length} out of {sampleQuestions.length} questions. 
                      Are you sure you want to submit your assessment?
                    </p>
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setShowSubmitConfirm(false)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Continue Assessment
                      </Button>
                      <Button onClick={handleSubmitAssessment}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Submit Assessment
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessments;
