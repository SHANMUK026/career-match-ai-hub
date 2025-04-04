import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Play,
  Pause,
  SkipForward,
  ArrowRight,
  CheckCircle2,
  FileQuestion,
  Clock,
  BrainCircuit,
  BarChart
} from 'lucide-react';
import { toast } from 'sonner';

const SmartMockInterview = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [interviewStarted, setInterviewStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(120);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

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

  const getQuestions = () => {
    return selectedRole && sampleQuestions[selectedRole as keyof typeof sampleQuestions]
      ? sampleQuestions[selectedRole as keyof typeof sampleQuestions]
      : ["Please select a job role to see questions"];
  };

  const questions = getQuestions();

  const startInterview = () => {
    if (!selectedRole) {
      toast.error("Please select a job role");
      return;
    }

    setInterviewStarted(true);
    setCurrentQuestionIndex(0);
    setTimer(120);
    setIsAnswering(false);
    setCompletedQuestions([]);
    toast.success("Interview started! Take your time to think before answering.");
  };

  const startAnswering = () => {
    setIsAnswering(true);
    toast.info("Recording started. You have 2 minutes to answer.");
  };

  const submitAnswer = () => {
    if (userAnswer.trim().length < 10) {
      toast.error("Please provide a more detailed answer");
      return;
    }

    setCompletedQuestions([...completedQuestions, currentQuestionIndex]);
    setUserAnswer("");
    setIsAnswering(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      toast.success("Answer submitted! Moving to next question.");
    } else {
      toast.success("Interview completed! Check your feedback.");
    }
  };

  const skipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswering(false);
      setUserAnswer("");
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
          <h1 className="text-3xl font-bold mb-2">Smart Mock Interview</h1>
          <p className="text-gray-600 mb-8">
            AI-Powered adaptive mock interviews
          </p>

          <Tabs defaultValue="interview" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="interview">Start Interview</TabsTrigger>
              <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="interview">
              {!interviewStarted ? (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Set Up Your Interview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Role</label>
                      <select
                        className="w-full p-3 border rounded-md"
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
                      <select className="w-full p-3 border rounded-md">
                        <option value="">Select difficulty</option>
                        {difficultyLevels.map(level => (
                          <option key={level.id} value={level.label}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
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
                        <h2 className="text-xl font-semibold">{selectedRole}</h2>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock size={16} className="mr-1" />
                        <span>{formatTimer(timer)}</span>
                      </div>
                    </div>

                    <div className="border-l-4 border-primary pl-4 py-2 bg-gray-50 mb-4">
                      <p className="text-lg">{questions[currentQuestionIndex]}</p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Your Answer</label>
                      <Textarea
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
                          Skip Question
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
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartMockInterview;
