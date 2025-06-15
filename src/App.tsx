
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Lazy load pages for better performance
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';
import JobApplicationPage from '@/pages/JobApplicationPage';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Assessments from '@/pages/Assessments';
import MockInterview from '@/pages/MockInterview';
import SmartMockInterview from '@/pages/SmartMockInterview';
import VideoInterview from '@/pages/VideoInterview';
import Contact from '@/pages/Contact';
import Employers from '@/pages/Employers';
import Payment from '@/pages/Payment';
import CandidateReview from '@/pages/CandidateReview';
import NotFound from '@/pages/NotFound';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/employers" element={<Employers />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/assessments" element={
                  <ProtectedRoute>
                    <Assessments />
                  </ProtectedRoute>
                } />
                <Route path="/mock-interview" element={
                  <ProtectedRoute>
                    <MockInterview />
                  </ProtectedRoute>
                } />
                <Route path="/smart-interview" element={
                  <ProtectedRoute>
                    <SmartMockInterview />
                  </ProtectedRoute>
                } />
                <Route path="/video-interview" element={
                  <ProtectedRoute>
                    <VideoInterview />
                  </ProtectedRoute>
                } />
                <Route path="/apply/:jobId" element={
                  <ProtectedRoute>
                    <JobApplicationPage />
                  </ProtectedRoute>
                } />
                <Route path="/payment" element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                } />
                <Route path="/candidate-review" element={
                  <ProtectedRoute>
                    <CandidateReview />
                  </ProtectedRoute>
                } />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
