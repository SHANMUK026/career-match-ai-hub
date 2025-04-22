
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Core components - load immediately
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";

// Lazy-loaded components - only load when needed
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const JobApplicationPage = lazy(() => import("./pages/JobApplicationPage"));
const Employers = lazy(() => import("./pages/Employers"));
const Assessments = lazy(() => import("./pages/Assessments"));
const MockInterview = lazy(() => import("./pages/MockInterview"));
const SmartMockInterview = lazy(() => import("./pages/SmartMockInterview"));
const VideoInterview = lazy(() => import("./pages/VideoInterview"));
const CandidateReview = lazy(() => import("./pages/CandidateReview"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Payment = lazy(() => import("./pages/Payment"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const AIChatbot = lazy(() => import("./components/common/AIChatbot"));

// Loading fallback component with improved styling
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div className="w-full max-w-md space-y-6 p-6">
      <div className="flex justify-center">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <svg className="h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

const App = () => {
  // Move the QueryClient creation inside the component and memoize it
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false // Reduce unnecessary refetches
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" closeButton richColors />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Public job routes */}
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/jobs/post" element={<JobApplicationPage />} />
                <Route path="/job-application/:id" element={<JobApplicationPage />} />
                <Route path="/employers" element={<Employers />} />
                <Route path="/employers/profile" element={<Employers />} />
                
                {/* Protected routes - only accessible after login */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/assessments" 
                  element={
                    <ProtectedRoute>
                      <Assessments />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/mock-interview" 
                  element={
                    <ProtectedRoute>
                      <MockInterview />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/smart-interview" 
                  element={
                    <ProtectedRoute>
                      <SmartMockInterview />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/video-interview/:id" 
                  element={
                    <ProtectedRoute>
                      <VideoInterview />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/candidate-review" 
                  element={
                    <ProtectedRoute>
                      <CandidateReview />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/payment" 
                  element={
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  } 
                />
                {/* Catch-all route - place at the end */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AIChatbot />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
