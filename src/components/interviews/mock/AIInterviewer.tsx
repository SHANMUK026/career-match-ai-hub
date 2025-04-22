
import React from 'react';
import { useEffect, useState } from 'react';
import { Avatar } from '@/components/ui/avatar';

interface AIInterviewerProps {
  isActive?: boolean;
  isSpeaking?: boolean;
}

const AIInterviewer: React.FC<AIInterviewerProps> = ({ 
  isActive = true, 
  isSpeaking = false 
}) => {
  const [blinkTimer, setBlinkTimer] = useState<number | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Simulate random blinking
  useEffect(() => {
    if (!isActive) return;
    
    const scheduleNextBlink = () => {
      // Random time between 2-7 seconds
      const nextBlinkIn = Math.floor(Math.random() * 5000) + 2000;
      
      const timerId = window.setTimeout(() => {
        setIsBlinking(true);
        
        // Blink for 200ms
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
    <div className="flex flex-col items-center">
      <div className="relative mb-2">
        <Avatar className="h-20 w-20 border-2 border-primary">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 h-full w-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">AI</span>
          </div>
        </Avatar>
        
        {/* Face representation */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="relative w-12 h-6">
            {/* Eyes */}
            <div className="flex justify-between w-full">
              <div className={`w-2.5 h-${isBlinking ? '0.5' : '2.5'} bg-white rounded-full transition-height duration-100`}></div>
              <div className={`w-2.5 h-${isBlinking ? '0.5' : '2.5'} bg-white rounded-full transition-height duration-100`}></div>
            </div>
            
            {/* Mouth */}
            <div className={`w-8 h-1.5 ${isSpeaking ? 'h-3 rounded-full' : 'h-1.5 rounded'} bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-200`}></div>
          </div>
        </div>
        
        {isSpeaking && (
          <span className="absolute -bottom-1 right-0 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
        )}
      </div>
      <h3 className="font-medium text-sm">AI Interviewer</h3>
    </div>
  );
};

export default AIInterviewer;
