
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface AIInterviewerProps {
  isActive: boolean;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AIInterviewer: React.FC<AIInterviewerProps> = ({ 
  isActive, 
  isSpeaking = false,
  size = 'md'
}) => {
  const [blinkInterval, setBlinkInterval] = useState<number>(5);
  const { theme } = useTheme();
  
  // Make eyes blink occasionally
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      const randomInterval = Math.floor(Math.random() * 5) + 2;
      setBlinkInterval(randomInterval);
    }, (blinkInterval * 1000));
    
    return () => clearInterval(interval);
  }, [isActive, blinkInterval]);
  
  // Determine size dimensions
  const getDimensions = () => {
    switch(size) {
      case 'sm': return { width: 80, height: 80, fontSize: 'text-xs' };
      case 'lg': return { width: 180, height: 180, fontSize: 'text-lg' };
      default: return { width: 120, height: 120, fontSize: 'text-base' };
    }
  };
  
  const { width, height, fontSize } = getDimensions();
  
  // Face animation variants
  const faceVariants = {
    idle: {
      y: [0, 2, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    },
    active: {
      y: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };
  
  // Eye animation variants
  const eyeVariants = {
    open: { scaleY: 1 },
    blink: { scaleY: 0, transition: { duration: 0.1 } }
  };

  return (
    <div className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
      {/* AI Face */}
      <motion.div 
        className={`rounded-full flex items-center justify-center relative ai-avatar-glow
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}
        style={{ 
          width, 
          height,
          boxShadow: isActive ? `0 0 20px ${theme === 'dark' ? '#6366f1' : '#c7d2fe'}` : 'none',
        }}
        animate={isActive ? "active" : "idle"}
        variants={faceVariants}
      >
        {/* Eyes */}
        <div className="flex space-x-4">
          <motion.div 
            className={`w-3 h-5 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'}`}
            animate={isActive && Math.random() > 0.7 ? "blink" : "open"}
            variants={eyeVariants}
            transition={{ duration: 0.1 }}
          />
          <motion.div 
            className={`w-3 h-5 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'}`}
            animate={isActive && Math.random() > 0.7 ? "blink" : "open"}
            variants={eyeVariants}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        {/* Mouth */}
        <motion.div 
          className={`absolute bottom-[30%] w-10 h-1 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'}`}
          animate={isSpeaking ? {
            height: ["2px", "6px", "2px"],
            transition: {
              repeat: Infinity,
              duration: 0.3
            }
          } : {}}
        />
      </motion.div>
      
      {/* AI Label */}
      <div className={`mt-3 font-medium ${fontSize} ai-gradient-text`}>
        AI Interviewer
        {isSpeaking && (
          <span className="inline-block ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        )}
      </div>
    </div>
  );
};

export default AIInterviewer;
