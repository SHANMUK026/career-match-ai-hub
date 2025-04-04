
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AIChatbot from "./components/common/AIChatbot";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import JobApplicationPage from "./pages/JobApplicationPage";
import Employers from "./pages/Employers";
import Assessments from "./pages/Assessments";
import MockInterview from "./pages/MockInterview";
import SmartMockInterview from "./pages/SmartMockInterview";
import VideoInterview from "./pages/VideoInterview";
import CandidateReview from "./pages/CandidateReview";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Public job routes */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/job-application/:id" element={<JobApplicationPage />} />
          <Route path="/employers" element={<Employers />} />
          
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
