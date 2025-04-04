
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ChatSidebarProps {
  isChatOpen: boolean;
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isChatOpen, onClose }) => {
  if (!isChatOpen) return null;
  
  return (
    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg p-4 border-l">
      <h3 className="font-medium mb-3 flex justify-between items-center">
        Interview Chat
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </h3>
      <div className="h-full flex items-center justify-center text-gray-500">
        Chat would be implemented here
      </div>
    </div>
  );
};

export default ChatSidebar;
