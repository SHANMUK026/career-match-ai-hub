
import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';

// Dynamic face animation for AI interviewer - Optimized version
const AIInterviewer: React.FC = () => {
  const [blink, setBlink] = useState(false);
  const [talking, setTalking] = useState(false);
  
  // Random blinking effect - optimized with less frequent updates
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, Math.random() * 5000 + 3000); // Less frequent blinking
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Random talking animation - optimized with less frequent updates 
  useEffect(() => {
    const talkingInterval = setInterval(() => {
      setTalking(Math.random() > 0.6); // Talk less frequently
    }, 500); // Slower animation rate
    
    return () => clearInterval(talkingInterval);
  }, []);
  
  return (
    <motion.div 
      className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 flex items-center justify-center text-white font-bold text-xl"
      animate={{ scale: talking ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {/* Face */}
        <div className="flex flex-col items-center">
          {/* Eyes */}
          <div className="flex space-x-2">
            <motion.div 
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scaleY: blink ? 0.1 : 1 }}
              transition={{ duration: 0.1 }}
            />
            <motion.div 
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scaleY: blink ? 0.1 : 1 }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Mouth */}
          <motion.div 
            className="w-4 h-1 bg-white rounded-full mt-1"
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
