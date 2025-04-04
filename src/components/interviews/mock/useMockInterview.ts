
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { sampleQuestions, sampleFeedback } from './mockInterviewData';
import { InterviewState, InterviewHistory } from './mockInterviewTypes';

export const useMockInterview = () => {
  const [state, setState] = useState<InterviewState>({
    selectedRole: "",
    selectedDifficulty: "",
    interviewStarted: false,
    currentQuestionIndex: 0,
    timer: 120, // 2 minutes per question
    isAnswering: false,
    userAnswer: "",
    completedQuestions: [],
    showFeedback: false,
    feedback: "",
    interviewHistory: [
      { date: "April 1, 2025", role: "Frontend Developer", score: 85, questions: 5 },
      { date: "March 28, 2025", role: "Product Manager", score: 72, questions: 5 }
    ],
    isTimerRunning: false,
    timerInterval: null
  });
  
  useEffect(() => {
    // Clear any existing interval when component unmounts
    return () => {
      if (state.timerInterval) clearInterval(state.timerInterval);
    };
  }, [state.timerInterval]);
  
  useEffect(() => {
    if (state.isTimerRunning && state.timer > 0) {
      const interval = setInterval(() => {
        setState(prevState => {
          if (prevState.timer <= 1) {
            clearInterval(interval);
            return {
              ...prevState,
              timer: 0,
              isTimerRunning: false
            };
          }
          return {
            ...prevState,
            timer: prevState.timer - 1
          };
        });
      }, 1000);
      
      setState(prevState => ({
        ...prevState,
        timerInterval: interval
      }));
      
      return () => clearInterval(interval);
    } else if (state.timer === 0 && state.isAnswering) {
      toast.warning("Time's up! Please submit your answer now.");
      setState(prevState => ({
        ...prevState,
        isTimerRunning: false
      }));
    }
  }, [state.isTimerRunning, state.timer, state.isAnswering]);
  
  const getQuestions = () => {
    return state.selectedRole && sampleQuestions[state.selectedRole as keyof typeof sampleQuestions] 
      ? sampleQuestions[state.selectedRole as keyof typeof sampleQuestions] 
      : ["Please select a job role to see questions"];
  };
  
  const questions = getQuestions();
  
  const setSelectedRole = (role: string) => {
    setState(prevState => ({
      ...prevState,
      selectedRole: role
    }));
  };
  
  const setSelectedDifficulty = (difficulty: string) => {
    setState(prevState => ({
      ...prevState,
      selectedDifficulty: difficulty
    }));
  };
  
  const startInterview = () => {
    if (!state.selectedRole || !state.selectedDifficulty) {
      toast.error("Please select both a job role and difficulty level");
      return;
    }
    
    setState(prevState => ({
      ...prevState,
      interviewStarted: true,
      currentQuestionIndex: 0,
      timer: 120,
      isAnswering: false,
      completedQuestions: [],
      showFeedback: false
    }));
    
    toast.success("Interview started! Take your time to think before answering.");
  };
  
  const startAnswering = () => {
    setState(prevState => ({
      ...prevState,
      isAnswering: true,
      isTimerRunning: true
    }));
    
    toast.info("Recording started. You have 2 minutes to answer.");
  };
  
  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(prevState => ({
      ...prevState,
      userAnswer: e.target.value
    }));
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
    if (state.userAnswer.trim().length < 10) {
      toast.error("Please provide a more detailed answer");
      return;
    }
    
    if (state.timerInterval) clearInterval(state.timerInterval);
    
    const generatedFeedback = generateFeedback();
    
    setState(prevState => ({
      ...prevState,
      isTimerRunning: false,
      feedback: generatedFeedback,
      showFeedback: true,
      completedQuestions: [...prevState.completedQuestions, prevState.currentQuestionIndex]
    }));
  };
  
  const moveToNextQuestion = () => {
    if (state.currentQuestionIndex < questions.length - 1) {
      setState(prevState => ({
        ...prevState,
        userAnswer: "",
        showFeedback: false,
        isAnswering: false,
        timer: 120,
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }));
      
      toast.success("Moving to next question.");
    } else {
      // Interview completed
      const newHistory = {
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        role: state.selectedRole,
        score: Math.floor(65 + Math.random() * 30), // Random score between 65-95
        questions: questions.length
      };
      
      setState(prevState => ({
        ...prevState,
        interviewHistory: [newHistory, ...prevState.interviewHistory],
        interviewStarted: false
      }));
      
      toast.success("Interview completed! Check your feedback in the History tab.");
    }
  };
  
  const skipQuestion = () => {
    if (state.currentQuestionIndex < questions.length - 1) {
      setState(prevState => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        isAnswering: false,
        userAnswer: "",
        showFeedback: false,
        timer: 120
      }));
      
      toast.info("Question skipped");
    } else {
      toast.info("This is the last question");
    }
  };
  
  const endInterview = () => {
    setState(prevState => ({
      ...prevState,
      interviewStarted: false
    }));
  };
  
  const switchToInterviewTab = () => {
    document.querySelector('[value="interview"]')?.dispatchEvent(new Event('click'));
  };
  
  return {
    state,
    questions,
    setSelectedRole,
    setSelectedDifficulty,
    startInterview,
    startAnswering,
    handleUserAnswerChange,
    submitAnswer,
    moveToNextQuestion,
    skipQuestion,
    endInterview,
    switchToInterviewTab
  };
};
