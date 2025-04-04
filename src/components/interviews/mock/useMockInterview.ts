
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  getDifficultyQuestions, 
  getQuestions, 
  mockInterviewScoreData 
} from './mockInterviewData';
import { 
  InterviewHistoryItem, 
  AudioRecording,
  InterviewScore
} from './mockInterviewTypes';

export const useMockInterview = () => {
  const [state, setState] = useState({
    selectedRole: '',
    selectedDifficulty: 'Intermediate',
    interviewStarted: false,
    currentQuestionIndex: 0,
    timer: 120,
    isTimerRunning: false,
    isAnswering: false,
    isVoiceMode: false,
    isRecording: false,
    audioRecordings: [] as AudioRecording[],
    userAnswer: '',
    completedQuestions: [] as number[],
    showFeedback: false,
    feedback: '',
    interviewHistory: [] as InterviewHistoryItem[],
    interviewScore: undefined as InterviewScore | undefined,
    interviewFeedback: undefined as string | undefined
  });

  const questions = getQuestions(state.selectedRole);

  useEffect(() => {
    let timerId: number | undefined;
    
    if (state.isTimerRunning && state.timer > 0) {
      timerId = window.setInterval(() => {
        setState(prev => ({
          ...prev,
          timer: prev.timer - 1
        }));
      }, 1000);
    } else if (state.timer === 0 && state.isAnswering) {
      // Auto-submit when timer reaches zero
      submitAnswer();
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [state.isTimerRunning, state.timer, state.isAnswering]);

  const setSelectedRole = (role: string) => {
    setState(prev => ({
      ...prev,
      selectedRole: role
    }));
  };

  const setSelectedDifficulty = (difficulty: string) => {
    setState(prev => ({
      ...prev,
      selectedDifficulty: difficulty
    }));
  };

  const toggleVoiceMode = () => {
    setState(prev => ({
      ...prev,
      isVoiceMode: !prev.isVoiceMode
    }));
    
    toast.info(state.isVoiceMode ? 
      'Switched to text mode' : 
      'Switched to voice recording mode'
    );
  };

  const handleRecordingStateChange = (isRecording: boolean) => {
    setState(prev => ({
      ...prev,
      isRecording
    }));
  };

  const handleAudioRecorded = (audioBlob: Blob) => {
    setState(prev => ({
      ...prev,
      audioRecordings: [
        ...prev.audioRecordings,
        {
          questionId: prev.currentQuestionIndex,
          audioBlob
        }
      ]
    }));
    
    // Auto submit after recording is complete
    if (state.isAnswering) {
      submitAnswer();
    }
  };

  const startInterview = () => {
    if (!state.selectedRole) {
      toast.error('Please select a job role');
      return;
    }
    
    setState(prev => ({
      ...prev,
      interviewStarted: true,
      currentQuestionIndex: 0,
      timer: 120,
      isTimerRunning: false,
      isAnswering: false,
      audioRecordings: [],
      userAnswer: '',
      completedQuestions: [],
      showFeedback: false,
      feedback: '',
      interviewScore: undefined,
      interviewFeedback: undefined
    }));
    
    toast.success('Interview started! Take your time to think before answering.');
  };

  const startAnswering = () => {
    setState(prev => ({
      ...prev,
      isAnswering: true,
      isTimerRunning: true
    }));
    
    toast.info('Recording started. You have 2 minutes to answer.');
  };

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(prev => ({
      ...prev,
      userAnswer: e.target.value
    }));
  };

  const generateFeedback = (answer: string, question: string) => {
    // In a real app, this would call an AI service
    // For now, we'll simulate feedback
    const feedbackOptions = [
      `Your answer was clear and addressed the key points. Consider adding specific examples of how you've applied these concepts in your previous work.`,
      `Good response! You demonstrated understanding of the core concepts. To improve, try structuring your answer with a brief introduction, key points, and a conclusion.`,
      `Your answer shows technical knowledge. To make it stronger, be more specific about how you would implement the solution, and mention potential challenges and how you'd address them.`,
      `You provided a solid conceptual explanation. Consider enhancing your answer by discussing trade-offs and alternative approaches to show depth of understanding.`
    ];
    
    return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
  };

  const submitAnswer = () => {
    if (state.isVoiceMode) {
      if (state.audioRecordings.length === 0 || 
          !state.audioRecordings.some(r => r.questionId === state.currentQuestionIndex)) {
        toast.error('Please record an answer before submitting');
        return;
      }
    } else if (state.userAnswer.trim().length < 10) {
      toast.error('Please provide a more detailed answer');
      return;
    }
    
    const feedback = generateFeedback(
      state.userAnswer, 
      questions[state.currentQuestionIndex]
    );
    
    setState(prev => ({
      ...prev,
      completedQuestions: [...prev.completedQuestions, prev.currentQuestionIndex],
      isAnswering: false,
      isTimerRunning: false,
      showFeedback: true,
      feedback
    }));
    
    toast.success('Answer submitted! Review your feedback.');
  };

  const moveToNextQuestion = () => {
    if (state.currentQuestionIndex < questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timer: 120,
        isAnswering: false,
        isTimerRunning: false,
        userAnswer: '',
        showFeedback: false,
        feedback: ''
      }));
      
      toast.success('Moving to next question.');
    } else {
      // This was the last question, show final feedback
      completeInterview();
    }
  };

  const skipQuestion = () => {
    if (state.currentQuestionIndex < questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timer: 120,
        isAnswering: false,
        isTimerRunning: false,
        userAnswer: '',
        showFeedback: false,
        feedback: ''
      }));
      
      toast.info('Question skipped');
    } else {
      toast.info('This is the last question');
    }
  };

  const calculateInterviewScore = (): InterviewScore => {
    // In a real app, this would be based on AI evaluation
    // For now, we'll generate a plausible score based on completed questions
    const completedPercentage = (state.completedQuestions.length / questions.length) * 100;
    
    // Base the overall score on the completed percentage with some randomness
    const randomFactor = Math.floor(Math.random() * 15);
    const baseScore = Math.min(Math.max(60, completedPercentage), 95);
    const overallScore = Math.min(Math.floor(baseScore + randomFactor - 5), 98);
    
    return {
      overallScore,
      technicalKnowledge: Math.floor(overallScore + (Math.random() * 10) - 5),
      communicationSkills: Math.floor(overallScore + (Math.random() * 10) - 5),
      problemSolving: Math.floor(overallScore + (Math.random() * 10) - 5),
      cultureFit: Math.floor(overallScore + (Math.random() * 10) - 5)
    };
  };

  const generateDetailedFeedback = (score: InterviewScore): string => {
    // In a real app, this would be generated by AI
    const feedbackParts = [
      'Overall, you demonstrated strong technical knowledge and communication skills in this interview.',
      `Your answers were generally well-structured and ${score.overallScore > 80 ? 'very comprehensive' : 'showed good understanding'}. `,
      'You presented your thoughts clearly and provided relevant examples from your experience.',
      '',
      'Areas of strength:',
      `- ${score.technicalKnowledge > 85 ? 'Excellent' : 'Good'} understanding of technical concepts`,
      `- ${score.communicationSkills > 85 ? 'Clear and concise' : 'Effective'} communication style`,
      score.problemSolving > 80 ? '- Strong problem-solving approach with methodical thinking' : '',
      '',
      'Areas for improvement:',
      '- Consider providing more specific examples from your past work',
      '- Practice concise answers that address all parts of the question',
      '- Work on structuring your answers with clear introduction and conclusion',
      '',
      `Overall, you performed ${score.overallScore > 85 ? 'exceptionally well' : score.overallScore > 75 ? 'very well' : 'well'} in this interview and would likely proceed to the next round in a real interview process.`
    ];
    
    return feedbackParts.filter(part => part !== '').join('\n');
  };

  const completeInterview = () => {
    const score = calculateInterviewScore();
    const detailedFeedback = generateDetailedFeedback(score);
    
    // Save interview to history
    const newHistoryItem: InterviewHistoryItem = {
      id: Date.now().toString(),
      date: new Date(),
      role: state.selectedRole,
      difficulty: state.selectedDifficulty,
      questionsAnswered: state.completedQuestions.length,
      totalQuestions: questions.length,
      score: score.overallScore
    };
    
    setState(prev => ({
      ...prev,
      interviewHistory: [newHistoryItem, ...prev.interviewHistory],
      interviewScore: score,
      interviewFeedback: detailedFeedback
    }));
    
    toast.success('Interview completed! Check your feedback.');
  };

  const endInterview = () => {
    // Confirm before ending
    if (window.confirm('Are you sure you want to end this interview? Your progress will be lost.')) {
      setState(prev => ({
        ...prev,
        interviewStarted: false
      }));
      
      toast.info('Interview ended');
    }
  };

  const finishWithFeedback = () => {
    setState(prev => ({
      ...prev,
      interviewStarted: false,
      interviewScore: undefined,
      interviewFeedback: undefined
    }));
  };

  const switchToInterviewTab = () => {
    setState(prev => ({
      ...prev,
      interviewStarted: false
    }));
  };

  return {
    state,
    questions,
    setSelectedRole,
    setSelectedDifficulty,
    toggleVoiceMode,
    handleRecordingStateChange,
    handleAudioRecorded,
    startInterview,
    startAnswering,
    handleUserAnswerChange,
    submitAnswer,
    moveToNextQuestion,
    skipQuestion,
    endInterview,
    finishWithFeedback,
    switchToInterviewTab
  };
};
