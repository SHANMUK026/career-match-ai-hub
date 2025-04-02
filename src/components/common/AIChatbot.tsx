
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Process message - this would be integrated with actual chatbot backend
      console.log('Message sent:', message);
      setMessage('');
    }
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
          <CardContent className="p-4 h-80 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                <p className="text-sm">
                  Hi there! I'm your AI Career Assistant. How can I help you with your job search today?
                </p>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary/10 p-3 rounded-lg shadow-sm max-w-[80%]">
                  <p className="text-sm">I need help with my resume.</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                <p className="text-sm">
                  I'd be happy to help with your resume! Would you like tips on formatting, content suggestions, or would you like me to review your current resume?
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t bg-white rounded-b-lg">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon" className="bg-primary-gradient">
                <Send className="h-4 w-4" />
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
