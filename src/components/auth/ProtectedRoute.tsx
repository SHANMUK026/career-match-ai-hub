
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener for real-time auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (mounted) {
          console.log('Auth state changed:', event, session?.user?.id);
          setSession(session);
          setLoading(false);
          setAuthChecked(true);
        }
      }
    );

    // Initial session check
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            toast.error("Authentication error. Please try logging in again.");
          }
        }
        if (mounted) {
          setSession(data.session);
          setLoading(false);
          setAuthChecked(true);
        }
      } catch (error: any) {
        console.error('Error in session check:', error);
        if (mounted) {
          toast.error("Authentication system error");
          setLoading(false);
          setAuthChecked(true);
        }
      }
    };

    checkSession();

    // Cleanup function
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <span className="text-lg text-gray-600 dark:text-gray-400">Verifying authentication...</span>
        </div>
      </div>
    );
  }

  if (!session && authChecked) {
    console.log('No session found, redirecting to login');
    toast.error("Please log in to access this page");
    // Store the intended destination for after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
