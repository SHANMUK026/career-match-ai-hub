
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface InterviewSettingsProps {
  onClose?: () => void;
}

const InterviewSettings: React.FC<InterviewSettingsProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [hasExistingKey, setHasExistingKey] = useState(false);
  
  useEffect(() => {
    const savedApiKey = localStorage.getItem('interviewAIApiKey');
    if (savedApiKey) {
      setHasExistingKey(true);
      // Only show first and last 4 characters of the key for security
      const maskedKey = `${savedApiKey.substring(0, 4)}...${savedApiKey.substring(savedApiKey.length - 4)}`;
      setApiKey(maskedKey);
    }
  }, []);
  
  const handleSaveApiKey = () => {
    if (!apiKey.trim() || apiKey.includes('...')) {
      toast.error('Please enter a valid API key');
      return;
    }
    
    localStorage.setItem('interviewAIApiKey', apiKey.trim());
    setHasExistingKey(true);
    toast.success('API key saved successfully');
    if (onClose) onClose();
  };
  
  const handleRemoveApiKey = () => {
    localStorage.removeItem('interviewAIApiKey');
    setApiKey('');
    setHasExistingKey(false);
    toast.info('API key removed');
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Interview AI Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="api-key" className="block text-sm font-medium mb-1">
            AI API Key
          </label>
          <Input
            id="api-key"
            type="text"
            placeholder={hasExistingKey ? "API key is set" : "Enter your API key"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            Required for advanced AI interviewing features
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleSaveApiKey} className="bg-primary-gradient">
            Save API Key
          </Button>
          {hasExistingKey && (
            <Button variant="outline" onClick={handleRemoveApiKey}>
              Remove API Key
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
        
        {hasExistingKey ? (
          <Alert className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-200">API Key Set</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-300">
              Your API key is saved and ready to use
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="default" className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <AlertTitle className="font-medium text-yellow-800 dark:text-yellow-300">API Key Required</AlertTitle>
            <AlertDescription className="text-yellow-700 dark:text-yellow-400">
              For the full AI interview experience, please add your API key
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
};

export default InterviewSettings;
