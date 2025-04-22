import React, { useEffect, useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

interface AIInterviewerProps {
  isActive?: boolean;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AIInterviewer: React.FC<AIInterviewerProps> = ({ 
  isActive = true, 
  isSpeaking = false,
  size = 'md'
}) => {
  const [blinkTimer, setBlinkTimer] = useState<number | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Get avatar size based on size prop
  const getAvatarSize = () => {
    switch(size) {
      case 'sm': return 'h-12 w-12';
      case 'lg': return 'h-24 w-24';
      default: return 'h-20 w-20';
    }
  };

  // Simulate random blinking
  useEffect(() => {
    if (!isActive) return;
    
    const scheduleNextBlink = () => {
      const nextBlinkIn = Math.floor(Math.random() * 5000) + 2000;
      
      const timerId = window.setTimeout(() => {
        setIsBlinking(true);
        window.setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 200);
      }, nextBlinkIn);
      
      setBlinkTimer(timerId);
    };
    
    scheduleNextBlink();
    
    return () => {
      if (blinkTimer) clearTimeout(blinkTimer);
    };
  }, [isActive]);
  
  if (!isActive) {
    return null;
  }
  
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative mb-2">
        <Avatar className={`${getAvatarSize()} border-2 border-primary`}>
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 h-full w-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">AI</span>
          </div>
        </Avatar>
        
        {/* Face representation */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className={`relative ${getFaceSize()}`}>
            {/* Eyes */}
            <div className="flex justify-between w-full">
              <motion.div 
                className={`${getEyeSize()} bg-white rounded-full`}
                animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                transition={{ duration: 0.1 }}
              />
              <motion.div 
                className={`${getEyeSize()} bg-white rounded-full`}
                animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Mouth */}
            <motion.div 
              className={`${getMouthSize()} ${isSpeaking ? 'rounded-full' : 'rounded'} bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2`}
              animate={{ 
                scaleY: isSpeaking ? 2 : 1,
                scaleX: isSpeaking ? 0.8 : 1
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
        
        {isSpeaking && (
          <motion.span 
            className={`absolute -bottom-1 right-0 ${getStatusSize()} bg-green-500 rounded-full`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
      <h3 className="font-medium text-sm">AI Interviewer</h3>
    </motion.div>
  );
};

// Add these helper functions inside the AIInterviewer component
const getFaceSize = () => {
  switch(size) {
    case 'sm': return 'w-8 h-5';
    case 'lg': return 'w-14 h-8';
    default: return 'w-12 h-6';
  }
};

const getEyeSize = () => {
  switch(size) {
    case 'sm': return 'w-1.5 h-1.5';
    case 'lg': return 'w-3 h-3';
    default: return 'w-2.5 h-2.5';
  }
};

const getMouthSize = () => {
  switch(size) {
    case 'sm': return 'w-5 h-1';
    case 'lg': return 'w-10 h-2';
    default: return 'w-8 h-1.5';
  }
};

const getStatusSize = () => {
  switch(size) {
    case 'sm': return 'h-2 w-2';
    case 'lg': return 'h-4 w-4';
    default: return 'h-3 w-3';
  }
};

export default AIInterviewer;
