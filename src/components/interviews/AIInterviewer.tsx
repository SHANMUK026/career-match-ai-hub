
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Dynamic face animation for AI interviewer
const AIInterviewer: React.FC = () => {
  const [blink, setBlink] = useState(false);
  const [talking, setTalking] = useState(false);
  
  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, Math.random() * 4000 + 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Random talking animation
  useEffect(() => {
    const talkingInterval = setInterval(() => {
      setTalking(Math.random() > 0.5);
    }, 300);
    
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
              scaleY: talking ? Math.random() * 1.5 + 0.5 : 1,
              scaleX: talking ? Math.random() * 0.4 + 0.8 : 1
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        {/* Pulse effect for AI */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          animate={{
            opacity: [0, 0.1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </div>
    </motion.div>
  );
};

export default AIInterviewer;
