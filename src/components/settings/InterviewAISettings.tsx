import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Mic, Brain, VideoIcon, AlertCircle, Key, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export const InterviewAISettings = () => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');
  const [feedbackLevel, setFeedbackLevel] = useState([70]);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyStatus, setApiKeyStatus] = useState<'none' | 'valid' | 'checking'>('none');
  
  useEffect(() => {
    // Load settings from localStorage
    const savedApiKey = localStorage.getItem('interviewAIApiKey');
    const savedAiEnabled = localStorage.getItem('aiEnabled');
    const savedVoiceEnabled = localStorage.getItem('voiceEnabled');
    const savedDifficulty = localStorage.getItem('interviewDifficulty');
    const savedFeedbackLevel = localStorage.getItem('feedbackLevel');
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setApiKeyStatus('valid');
    }
    
    if (savedAiEnabled) setAiEnabled(savedAiEnabled === 'true');
    if (savedVoiceEnabled) setVoiceEnabled(savedVoiceEnabled === 'true');
    if (savedDifficulty) setDifficulty(savedDifficulty);
    if (savedFeedbackLevel) setFeedbackLevel([parseInt(savedFeedbackLevel)]);
  }, []);
  
  const validateApiKey = () => {
    // In a real app, we would validate the API key against the service
    // For now, we'll just check if it looks like an API key (not empty and has a reasonable length)
    if (apiKey && apiKey.length > 10) {
      return true;
    }
    return false;
  };
  
  const handleAiEnabledChange = (checked: boolean) => {
    setAiEnabled(checked);
    localStorage.setItem('aiEnabled', String(checked));
    toast.info(`AI features ${checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleVoiceEnabledChange = (checked: boolean) => {
    setVoiceEnabled(checked);
    localStorage.setItem('voiceEnabled', String(checked));
    toast.info(`Voice mode ${checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    localStorage.setItem('interviewDifficulty', value);
  };
  
  const handleFeedbackLevelChange = (value: number[]) => {
    setFeedbackLevel(value);
    localStorage.setItem('feedbackLevel', String(value[0]));
  };
  
  const handleSaveSettings = () => {
    try {
      // Check if API key is valid
      if (!validateApiKey()) {
        toast.error('Please enter a valid API key');
        return;
      }
      
      // Save API key in localStorage for persistence
      localStorage.setItem('interviewAIApiKey', apiKey.trim());
      
      // Save other settings
      localStorage.setItem('aiEnabled', String(aiEnabled));
      localStorage.setItem('voiceEnabled', String(voiceEnabled));
      localStorage.setItem('interviewDifficulty', difficulty);
      localStorage.setItem('feedbackLevel', String(feedbackLevel[0]));
      
      setApiKeyStatus('valid');
      toast.success('AI interview settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings. Please try again.');
    }
  };
  
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
          Interview AI Preferences
        </CardTitle>
        <CardDescription>Customize your AI-powered interview experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex items-center">
              <Brain className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="font-medium">AI Interview Assistant</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get intelligent responses and feedback</p>
              </div>
            </div>
            <Switch 
              checked={aiEnabled} 
              onCheckedChange={handleAiEnabledChange}
            />
          </div>
          
          <div className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg border border-purple-100 dark:border-purple-800">
            <div className="flex items-center">
              <Mic className="h-5 w-5 text-purple-500 mr-2" />
              <div>
                <p className="font-medium">Voice Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Practice by speaking your answers</p>
              </div>
            </div>
            <Switch 
              checked={voiceEnabled} 
              onCheckedChange={handleVoiceEnabledChange}
            />
          </div>
          
          <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
            <div className="flex items-center">
              <VideoIcon className="h-5 w-5 text-amber-500 mr-2" />
              <div>
                <p className="font-medium">Video Recording</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Record video of your interview sessions</p>
              </div>
            </div>
            <Switch 
              defaultChecked={true} 
              onCheckedChange={() => toast.info("Video settings updated")}
            />
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-100 dark:border-green-800">
            <div className="flex items-start">
              <Key className="h-5 w-5 text-green-500 mt-1 mr-2" />
              <div className="flex-1">
                <p className="font-medium flex items-center">
                  AI API Key 
                  {apiKeyStatus === 'valid' && (
                    <span className="inline-flex items-center ml-2 text-sm text-green-600">
                      <CheckCircle size={14} className="mr-1" /> Valid
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Enter your API key to enable AI interview features
                </p>
                <Input
                  type="password"
                  placeholder="Enter your AI API key"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setApiKeyStatus('none');
                  }}
                  className="bg-white dark:bg-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-3">
          <Label htmlFor="interview-difficulty">Interview Difficulty</Label>
          <Select value={difficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger id="interview-difficulty" className="w-full">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy - Entry Level</SelectItem>
              <SelectItem value="medium">Medium - Intermediate</SelectItem>
              <SelectItem value="hard">Hard - Advanced</SelectItem>
              <SelectItem value="expert">Expert - Senior Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label htmlFor="feedback-level">Feedback Detail Level</Label>
            <span className="text-sm text-gray-500">{feedbackLevel}%</span>
          </div>
          <Slider 
            id="feedback-level" 
            value={feedbackLevel}
            max={100} 
            step={10} 
            onValueChange={handleFeedbackLevelChange}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Basic</span>
            <span>Detailed</span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-start space-x-3 my-6">
          <AlertCircle className="text-blue-500 h-5 w-5 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Pro Tip</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              For the most realistic interview experience, we recommend enabling both voice mode and video recording.
              Make sure to enter a valid API key to use AI features.
            </p>
          </div>
        </div>
        
        <motion.div 
          className="flex justify-end"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
            onClick={handleSaveSettings}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Save AI Settings
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};
