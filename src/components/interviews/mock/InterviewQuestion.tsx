
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  SkipForward, 
  ArrowRight, 
  CheckCircle2,
  Brain,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Mic,
  MessageSquare,
  Camera,
  Video
} from 'lucide-react';
import VideoDisplay from '../video-call/VideoDisplay';
import VoiceRecordingInterface from './VoiceRecordingInterface';

interface InterviewQuestionProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  question: string;
  selectedRole: string;
  selectedDifficulty: string;
  timer: number;
  isTimerRunning: boolean;
  isAnswering: boolean;
  isVoiceMode: boolean;
  isVideoMode: boolean;
  isRecording: boolean;
  userAnswer: string;
  showFeedback: boolean;
  feedback: string;
  onUserAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onStartAnswering: () => void;
  onSubmitAnswer: () => void;
  onMoveToNextQuestion: () => void;
  onSkipQuestion: () => void;
  onEndInterview: () => void;
  onToggleVoiceMode: () => void;
  onToggleVideoMode: () => void;
  onAudioRecorded: (audioBlob: Blob) => void;
  onRecordingStateChange: (isRecording: boolean) => void;
}

const InterviewQuestion: React.FC<InterviewQuestionProps> = ({
  currentQuestionIndex,
  totalQuestions,
  question,
  selectedRole,
  selectedDifficulty,
  timer,
  isTimerRunning,
  isAnswering,
  isVoiceMode,
  isVideoMode,
  isRecording,
  userAnswer,
  showFeedback,
  feedback,
  onUserAnswerChange,
  onStartAnswering,
  onSubmitAnswer,
  onMoveToNextQuestion,
  onSkipQuestion,
  onEndInterview,
  onToggleVoiceMode,
  onToggleVideoMode,
  onAudioRecorded,
  onRecordingStateChange
}) => {
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <h2 className="text-xl font-semibold">{selectedRole} - {selectedDifficulty}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleVideoMode}
            className="flex items-center gap-1"
          >
            {isVideoMode ? (
              <>
                <MessageSquare size={14} />
                Text Mode
              </>
            ) : (
              <>
                <Video size={14} />
                Video Mode
              </>
            )}
          </Button>
          {!isVideoMode && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onToggleVoiceMode}
              className="flex items-center gap-1"
            >
              {isVoiceMode ? (
                <>
                  <MessageSquare size={14} />
                  Text Mode
                </>
              ) : (
                <>
                  <Mic size={14} />
                  Voice Mode
                </>
              )}
            </Button>
          )}
          <div className="flex items-center text-gray-500">
            <Clock size={16} className="mr-1" />
            <span>{formatTimer(timer)}</span>
          </div>
        </div>
      </div>
      
      <div className="border-l-4 border-primary pl-4 py-2 bg-gray-50 mb-4">
        <p className="text-lg">{question}</p>
      </div>
      
      {isTimerRunning && (
        <div className="mb-4">
          <Progress value={(timer / 120) * 100} className="h-2" />
        </div>
      )}
      
      <div className="mb-4">
        {isVideoMode ? (
          <div className="space-y-3">
            <h3 className="block text-sm font-medium mb-2">Video Response</h3>
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
              <VideoDisplay 
                isConnecting={false}
                isVideoOff={false}
                isScreenSharing={false}
                interviewerName="AI Interviewer"
                elapsedTime={timer}
              />
            </div>
          </div>
        ) : isVoiceMode ? (
          <div className="space-y-3">
            <h3 className="block text-sm font-medium mb-2">Your Voice Response</h3>
            {isAnswering && (
              <VoiceRecordingInterface 
                onAudioRecorded={onAudioRecorded}
                onRecordingStateChange={onRecordingStateChange}
                isDisabled={!isAnswering || showFeedback}
              />
            )}
          </div>
        ) : (
          <>
            <label className="block text-sm font-medium mb-2">Your Answer</label>
            <Textarea 
              placeholder="Type your answer here..." 
              className="min-h-[150px]"
              value={userAnswer}
              onChange={onUserAnswerChange}
              disabled={!isAnswering || showFeedback}
            />
          </>
        )}
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
            <Button onClick={onStartAnswering}>
              <Play className="mr-2" size={16} />
              Start {isVideoMode ? 'Recording' : isVoiceMode ? 'Recording' : 'Answering'}
            </Button>
          ) : !showFeedback ? (
            <Button onClick={onSubmitAnswer} className="bg-primary-gradient">
              <CheckCircle2 className="mr-2" size={16} />
              Submit {isVideoMode ? 'Recording' : isVoiceMode ? 'Recording' : 'Answer'}
            </Button>
          ) : (
            <Button onClick={onMoveToNextQuestion} className="bg-primary-gradient">
              <ArrowRight className="mr-2" size={16} />
              {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Complete Interview"}
            </Button>
          )}
          
          {!showFeedback && (
            <Button variant="outline" onClick={onSkipQuestion}>
              <SkipForward className="mr-2" size={16} />
              Skip Question
            </Button>
          )}
        </div>
        
        <Button variant="destructive" onClick={onEndInterview}>
          End Interview
        </Button>
      </div>
    </Card>
  );
};

export default InterviewQuestion;
