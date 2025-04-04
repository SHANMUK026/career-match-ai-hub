
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InterviewSetup from '@/components/interviews/mock/InterviewSetup';
import InterviewQuestion from '@/components/interviews/mock/InterviewQuestion';
import InterviewProgress from '@/components/interviews/mock/InterviewProgress';
import InterviewHistoryComponent from '@/components/interviews/mock/InterviewHistory';
import InterviewTips from '@/components/interviews/mock/InterviewTips';
import InterviewFeedback from '@/components/interviews/mock/InterviewFeedback';
import { useMockInterview } from '@/components/interviews/mock/useMockInterview';
import { Brain, ThumbsUp, Award, Star } from 'lucide-react';

const MockInterview = () => {
  const {
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
  } = useMockInterview();
  
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
              {!state.interviewStarted ? (
                <InterviewSetup
                  selectedRole={state.selectedRole}
                  selectedDifficulty={state.selectedDifficulty}
                  onRoleChange={setSelectedRole}
                  onDifficultyChange={setSelectedDifficulty}
                  onStartInterview={startInterview}
                />
              ) : state.interviewScore ? (
                <InterviewFeedback
                  overallScore={state.interviewScore.overallScore}
                  feedbackItems={[
                    {
                      category: 'Technical Knowledge',
                      score: state.interviewScore.technicalKnowledge,
                      feedback: 'You demonstrated good understanding of technical concepts',
                      icon: <Brain className="text-blue-500" size={18} />
                    },
                    {
                      category: 'Communication Skills',
                      score: state.interviewScore.communicationSkills,
                      feedback: 'Your explanations were clear and structured',
                      icon: <ThumbsUp className="text-green-500" size={18} />
                    },
                    {
                      category: 'Problem Solving',
                      score: state.interviewScore.problemSolving,
                      feedback: 'You showed methodical approach to solving problems',
                      icon: <Award className="text-purple-500" size={18} />
                    },
                    {
                      category: 'Culture Fit',
                      score: state.interviewScore.cultureFit,
                      feedback: 'You demonstrated alignment with company values',
                      icon: <Star className="text-yellow-500" size={18} />
                    }
                  ]}
                  detailedFeedback={state.interviewFeedback || ''}
                  onFinish={finishWithFeedback}
                />
              ) : (
                <div className="space-y-6">
                  <InterviewQuestion
                    currentQuestionIndex={state.currentQuestionIndex}
                    totalQuestions={questions.length}
                    question={questions[state.currentQuestionIndex]}
                    selectedRole={state.selectedRole}
                    selectedDifficulty={state.selectedDifficulty}
                    timer={state.timer}
                    isTimerRunning={state.isTimerRunning}
                    isAnswering={state.isAnswering}
                    isVoiceMode={state.isVoiceMode}
                    isRecording={state.isRecording}
                    userAnswer={state.userAnswer}
                    showFeedback={state.showFeedback}
                    feedback={state.feedback}
                    onUserAnswerChange={handleUserAnswerChange}
                    onStartAnswering={startAnswering}
                    onSubmitAnswer={submitAnswer}
                    onMoveToNextQuestion={moveToNextQuestion}
                    onSkipQuestion={skipQuestion}
                    onEndInterview={endInterview}
                    onToggleVoiceMode={toggleVoiceMode}
                    onAudioRecorded={handleAudioRecorded}
                    onRecordingStateChange={handleRecordingStateChange}
                  />
                  
                  <InterviewProgress
                    totalQuestions={questions.length}
                    currentQuestionIndex={state.currentQuestionIndex}
                    completedQuestions={state.completedQuestions}
                    showFeedback={state.showFeedback}
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <InterviewHistoryComponent
                interviewHistory={state.interviewHistory}
                onStartNewInterview={switchToInterviewTab}
              />
            </TabsContent>
            
            <TabsContent value="tips">
              <InterviewTips />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MockInterview;
