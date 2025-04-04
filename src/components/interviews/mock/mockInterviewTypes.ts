export interface InterviewHistoryItem {
  id: string;
  date: Date;
  role: string;
  difficulty: string;
  questionsAnswered: number;
  totalQuestions: number;
  score: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'interviewer';
  text: string;
  timestamp: Date;
}

// Add these new types
export interface InterviewScore {
  overallScore: number;
  technicalKnowledge: number;
  communicationSkills: number;
  problemSolving: number;
  cultureFit: number;
}

export interface InterviewFeedbackItem {
  category: string;
  score: number;
  feedback: string;
}

export interface AudioRecording {
  questionId: number;
  audioBlob: Blob;
  transcription?: string;
}

// Update the MockInterviewState type to include voice recording features
export interface MockInterviewState {
  selectedRole: string;
  selectedDifficulty: string;
  interviewStarted: boolean;
  currentQuestionIndex: number;
  timer: number;
  isTimerRunning: boolean;
  isAnswering: boolean;
  isVoiceMode: boolean;
  isRecording: boolean;
  audioRecordings: AudioRecording[];
  userAnswer: string;
  completedQuestions: number[];
  showFeedback: boolean;
  feedback: string;
  interviewHistory: InterviewHistoryItem[];
  interviewScore?: InterviewScore;
  interviewFeedback?: string;
}
