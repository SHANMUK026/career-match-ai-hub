
export interface InterviewHistory {
  date: string;
  role: string;
  score: number;
  questions: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'interviewer';
  text: string;
  timestamp: Date;
}

export interface InterviewState {
  selectedRole: string;
  selectedDifficulty: string;
  interviewStarted: boolean;
  currentQuestionIndex: number;
  timer: number;
  isAnswering: boolean;
  userAnswer: string;
  completedQuestions: number[];
  showFeedback: boolean;
  feedback: string;
  interviewHistory: InterviewHistory[];
  isTimerRunning: boolean;
  timerInterval: NodeJS.Timeout | null;
}
