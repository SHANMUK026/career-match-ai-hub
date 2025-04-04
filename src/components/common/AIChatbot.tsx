
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Send, Loader2, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type Message = {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

// Website knowledge base for the chatbot
const websiteKnowledge = {
  jobs: {
    path: '/jobs',
    description: 'Browse job listings and apply to opportunities matching your skills.',
    keywords: ['jobs', 'job listings', 'apply', 'job search', 'career', 'find jobs', 'job opportunities']
  },
  employers: {
    path: '/employers',
    description: 'Post jobs, browse companies, and find talent for your business.',
    keywords: ['employers', 'hire', 'post job', 'recruit', 'hiring', 'company', 'business', 'talent']
  },
  assessments: {
    path: '/assessments',
    description: 'Take skill-based assessments to verify your expertise and improve your job matches.',
    keywords: ['assessment', 'skills', 'test', 'evaluation', 'verify', 'certification', 'skill test']
  },
  mockInterview: {
    path: '/mock-interview',
    description: 'Practice interviews with our AI to prepare for real job interviews.',
    keywords: ['interview', 'practice', 'mock', 'preparation', 'video interview', 'train', 'prepare']
  },
  videoInterview: {
    path: '/video-interview/1',
    description: 'Join your scheduled video interviews with potential employers.',
    keywords: ['video call', 'meeting', 'live interview', 'video', 'call', 'meet', 'face to face', 'google meet']
  },
  login: {
    path: '/login',
    description: 'Log in to your account to access all features.',
    keywords: ['login', 'sign in', 'account', 'access']
  },
  signup: {
    path: '/signup',
    description: 'Create a new account to start using our platform.',
    keywords: ['signup', 'register', 'create account', 'join']
  },
  dashboard: {
    path: '/dashboard',
    description: 'View your personalized dashboard with job recommendations and applications.',
    keywords: ['dashboard', 'profile', 'recommendations', 'applications', 'my account']
  }
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi there! I'm your AI Career Assistant. How can I help you with your job search today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast.success('AI Career Assistant is ready to help');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: message.trim(),
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setMessage('');
      setIsTyping(true);
      
      // Process the message and check for navigation intents
      setTimeout(() => {
        const response = processUserMessage(userMessage.content);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response.message,
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setIsTyping(false);
        
        // If navigation is requested, navigate after a short delay
        if (response.navigate) {
          setTimeout(() => {
            navigate(response.path);
            toast.success(`Navigating to ${getPageNameFromPath(response.path)}`);
          }, 1000);
        }
      }, 1200);
    }
  };

  const getPageNameFromPath = (path: string): string => {
    // Remove leading slash and capitalize first letter of each word
    return path.replace(/^\//, '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const processUserMessage = (userMessage: string): { message: string; navigate: boolean; path: string } => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check for navigation intents
    for (const [key, data] of Object.entries(websiteKnowledge)) {
      const matched = data.keywords.some(keyword => 
        lowerCaseMessage.includes(keyword)
      );
      
      if (matched) {
        return {
          message: `I can help you with that! ${data.description} Would you like me to take you there now?`,
          navigate: true,
          path: data.path
        };
      }
    }
    
    // Handle greetings
    if (lowerCaseMessage.match(/hi|hello|hey|greetings/i)) {
      return {
        message: "Hello! I'm your AI Career Assistant. How can I help you today? You can ask me about job listings, assessments, interviews, or creating your profile.",
        navigate: false,
        path: ''
      };
    }
    
    // Handle general job search queries
    if (lowerCaseMessage.match(/job|career|work|position|opportunity/i)) {
      return {
        message: "Looking for job opportunities? Our platform offers AI-matched job recommendations based on your skills and preferences. Would you like to browse our job listings?",
        navigate: true,
        path: '/jobs'
      };
    }
    
    // Handle interview related queries
    if (lowerCaseMessage.match(/interview|meet|call|video|prepare|practice/i)) {
      return {
        message: "We offer both mock interviews with AI for practice and video interviews with potential employers. Would you like to try a mock interview to prepare?",
        navigate: true,
        path: '/mock-interview'
      };
    }
    
    // Default response
    return {
      message: "I'm here to help you navigate our platform. You can ask me about job listings, employers, assessments, interviews, or your dashboard. What would you like to explore?",
      navigate: false,
      path: ''
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 shadow-2xl animate-fade-in">
          <CardHeader className="bg-primary-gradient text-white rounded-t-lg flex flex-row items-center justify-between p-4">
            <CardTitle className="text-white text-lg flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Career Assistant
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChatbot}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 h-80 overflow-y-auto bg-gray-50 relative">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`${
                    msg.type === 'bot' 
                      ? 'bg-white border border-gray-100' 
                      : 'bg-primary/10 ml-auto'
                  } p-3 rounded-lg shadow-sm max-w-[80%] ${
                    msg.type === 'user' ? 'ml-auto' : ''
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              ))}
              {isTyping && (
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%] flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {messages.length > 5 && (
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white"
                onClick={scrollToBottom}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          </CardContent>
          <CardFooter className="p-3 border-t bg-white rounded-b-lg">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-primary-gradient"
                disabled={isTyping || !message.trim()}
              >
                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={toggleChatbot}
          className="bg-primary-gradient h-14 w-14 rounded-full shadow-lg animate-pulse flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default AIChatbot;
