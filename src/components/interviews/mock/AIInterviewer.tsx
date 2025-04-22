
import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';

interface AIInterviewerProps {
  isActive?: boolean;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Dynamic face animation for AI interviewer
const AIInterviewer: React.FC<AIInterviewerProps> = ({ 
  isActive = true, 
  isSpeaking = false,
  size = 'md'
}) => {
  const [blink, setBlink] = useState(false);
  const [talking, setTalking] = useState(false);
  
  // Helper function to get face size based on prop
  const getFaceSize = () => {
    switch(size) {
      case 'sm': return { face: 'w-8 h-8', eyes: 'w-1.5 h-1.5', mouth: 'w-3 h-1' };
      case 'lg': return { face: 'w-16 h-16', eyes: 'w-2.5 h-2.5', mouth: 'w-5 h-1.5' };
      default: return { face: 'w-12 h-12', eyes: 'w-2 h-2', mouth: 'w-4 h-1' };
    }
  };
  
  // Random blinking effect - optimized with less frequent updates
  useEffect(() => {
    if (!isActive) return;
    
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, Math.random() * 5000 + 3000); // Less frequent blinking
    
    return () => clearInterval(blinkInterval);
  }, [isActive]);
  
  // Talking animation based on isSpeaking prop
  useEffect(() => {
    if (!isActive) return;
    
    setTalking(isSpeaking);
    
    // Also add random mouth movements when speaking
    if (isSpeaking) {
      const talkingInterval = setInterval(() => {
        setTalking(prev => !prev); // Create a more realistic talking animation
      }, 150);
      
      return () => clearInterval(talkingInterval);
    }
  }, [isSpeaking, isActive]);
  
  const sizeClasses = getFaceSize();
  
  return (
    <motion.div 
      className={`rounded-full bg-gradient-to-r from-blue-500 to-purple-600 ${sizeClasses.face} flex items-center justify-center text-white font-bold text-xl`}
      animate={{ scale: talking ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {/* Face */}
        <div className="flex flex-col items-center">
          {/* Eyes */}
          <div className="flex space-x-2">
            <motion.div 
              className={`${sizeClasses.eyes} bg-white rounded-full`}
              animate={{ scaleY: blink ? 0.1 : 1 }}
              transition={{ duration: 0.1 }}
            />
            <motion.div 
              className={`${sizeClasses.eyes} bg-white rounded-full`}
              animate={{ scaleY: blink ? 0.1 : 1 }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Mouth */}
          <motion.div 
            className={`${sizeClasses.mouth} bg-white rounded-full mt-1`}
            animate={{ 
              scaleY: talking ? Math.random() * 1.2 + 0.5 : 1,
              scaleX: talking ? Math.random() * 0.3 + 0.8 : 1
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        {/* Pulse effect for AI - optimized to be less resource intensive */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white opacity-10"
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </div>
    </motion.div>
  );
};

// Using memo to prevent unnecessary re-renders
export default memo(AIInterviewer);
