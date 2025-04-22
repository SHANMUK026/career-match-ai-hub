import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import PageLoader from "@/components/common/PageLoader";

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

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      },
    },
  }));

  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="app-container">
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
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
