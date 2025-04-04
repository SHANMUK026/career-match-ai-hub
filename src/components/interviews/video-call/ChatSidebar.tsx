
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, X, ChevronRight } from 'lucide-react';
import { ChatMessage } from '../mock/mockInterviewTypes';
import { formatDistanceToNow } from 'date-fns';

interface ChatSidebarProps {
  isChatOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isChatOpen,
  onClose,
  messages,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (isChatOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  if (!isChatOpen) return null;
  
  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-80 md:w-96 bg-white shadow-xl flex flex-col z-40 transition-all duration-300 ease-in-out">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold text-lg">Interview Chat</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="hover:bg-gray-100 rounded-full h-8 w-8"
        >
          <X size={18} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="h-8 w-8 mx-2 mt-1">
                  {message.sender === 'user' ? (
                    <AvatarFallback className="bg-primary text-white">
                      Y
                    </AvatarFallback>
                  ) : (
                    <AvatarImage src="https://ui-avatars.com/api/?name=Interviewer&background=4f46e5&color=fff" />
                  )}
                </Avatar>
                <div>
                  <div 
                    className={`py-2 px-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-gray-100 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t flex items-end">
        <Textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="min-h-[60px] resize-none flex-1 mr-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="bg-primary-gradient h-10 w-10"
          disabled={!newMessage.trim()}
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ChatSidebar;
