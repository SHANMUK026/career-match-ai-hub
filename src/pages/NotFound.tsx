
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isJobRelated = location.pathname.includes('/job') || location.pathname.includes('/jobs');
  const isJobApplication = location.pathname.includes('/job-application');

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        
        {isJobApplication ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">Job Application Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We couldn't find the job application you're looking for. The position may have been filled or removed from our system.
            </p>
            <div className="space-y-4">
              <Button 
                className="bg-primary-gradient w-full" 
                onClick={() => navigate('/jobs')}
                size="lg"
              >
                <Search className="mr-2" size={18} />
                Browse Available Jobs
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2" size={18} />
                Go Back
              </Button>
            </div>
          </>
        ) : isJobRelated ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">Job Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sorry, the job you're looking for may have been filled or removed from our system.
            </p>
            <div className="space-y-4">
              <Button 
                className="bg-primary-gradient w-full" 
                onClick={() => navigate('/jobs')}
                size="lg"
              >
                <Search className="mr-2" size={18} />
                Browse Available Jobs
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2" size={18} />
                Go Back
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <div className="space-y-4">
              <Button 
                className="bg-primary-gradient w-full" 
                onClick={() => navigate('/')}
                size="lg"
              >
                <Home className="mr-2" size={18} />
                Return to Home
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2" size={18} />
                Go Back
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFound;
