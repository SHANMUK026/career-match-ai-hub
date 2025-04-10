
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface AIInterviewHelperProps {
  isActive: boolean;
}

const AIInterviewHelper: React.FC<AIInterviewHelperProps> = ({ isActive }) => {
  const [apiKey, setApiKey] = React.useState<string | null>(null);
  
  // Load API key from localStorage on component mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem('interviewAIApiKey');
    setApiKey(savedApiKey);
  }, []);
  
  if (!isActive) {
    return null;
  }
  
  if (!apiKey) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>API Key Missing</AlertTitle>
        <AlertDescription>
          AI interview features require an API key. Please add your API key in the Interview AI Settings.
        </AlertDescription>
      </Alert>
    );
  }
  
  // Here we would normally make API calls with the apiKey
  // This component just verifies the API key exists
  return (
    <Alert className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 mb-4">
      <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle className="text-green-800 dark:text-green-200">AI Assistant Active</AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-300">
        AI interview assistance is enabled and ready to help analyze your responses.
      </AlertDescription>
    </Alert>
  );
};

export default AIInterviewHelper;
