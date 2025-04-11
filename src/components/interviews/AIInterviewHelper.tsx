
import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AIInterviewHelperProps {
  isActive: boolean;
}

const AIInterviewHelper: React.FC<AIInterviewHelperProps> = ({ isActive }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('interviewAIApiKey');
    setApiKey(savedApiKey);
  }, []);
  
  if (!isActive) {
    return null;
  }
  
  if (!apiKey || apiKey.length <= 10) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>API Key Missing</AlertTitle>
        <AlertDescription className="flex flex-col space-y-2">
          <p>AI interview features require an API key. Please add your API key in the Interview AI Settings.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="self-start mt-2"
            onClick={() => navigate('/settings')}
          >
            Go to Settings
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 mb-4">
      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle className="text-green-800 dark:text-green-200">AI Assistant Active</AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-300">
        AI interview assistance is enabled and ready to help analyze your responses.
      </AlertDescription>
    </Alert>
  );
};

export default AIInterviewHelper;
