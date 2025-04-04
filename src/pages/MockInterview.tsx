
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InterviewSetup from '@/components/interviews/mock/InterviewSetup';
import InterviewQuestion from '@/components/interviews/mock/InterviewQuestion';
import InterviewProgress from '@/components/interviews/mock/InterviewProgress';
import InterviewHistoryComponent from '@/components/interviews/mock/InterviewHistory';
import InterviewTips from '@/components/interviews/mock/InterviewTips';
import { useMockInterview } from '@/components/interviews/mock/useMockInterview';

const MockInterview = () => {
  const {
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
                    userAnswer={state.userAnswer}
                    showFeedback={state.showFeedback}
                    feedback={state.feedback}
                    onUserAnswerChange={handleUserAnswerChange}
                    onStartAnswering={startAnswering}
                    onSubmitAnswer={submitAnswer}
                    onMoveToNextQuestion={moveToNextQuestion}
                    onSkipQuestion={skipQuestion}
                    onEndInterview={endInterview}
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
