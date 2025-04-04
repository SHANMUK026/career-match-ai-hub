
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ChatMessage } from '../mock/mockInterviewTypes';

export interface VideoCallState {
  isMuted: boolean;
  isVideoOff: boolean;
  isConnecting: boolean;
  elapsedTime: number;
  isChatOpen: boolean;
  isScreenSharing: boolean;
  chatMessages: ChatMessage[];
}

export interface VideoCallActions {
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
  toggleChat: () => void;
  endCall: () => void;
  sendChatMessage: (text: string) => void;
}

export const useVideoCall = (onEnd?: () => void): [VideoCallState, VideoCallActions] => {
  const [state, setState] = useState<VideoCallState>({
    isMuted: false,
    isVideoOff: false,
    isConnecting: true,
    elapsedTime: 0,
    isChatOpen: false,
    isScreenSharing: false,
    chatMessages: []
  });
  
  // Simulate connection delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, isConnecting: false }));
      toast.success('Connected to interview room');
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'interviewer',
        text: "Hello! I'm Sarah, your interviewer today. Feel free to ask any questions before we start.",
        timestamp: new Date()
      };
      
      setState(prev => ({ 
        ...prev, 
        chatMessages: [...prev.chatMessages, welcomeMessage] 
      }));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Timer for call duration
  useEffect(() => {
    if (!state.isConnecting) {
      const timer = setInterval(() => {
        setState(prev => ({ ...prev, elapsedTime: prev.elapsedTime + 1 }));
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [state.isConnecting]);
  
  const toggleMute = () => {
    setState(prev => {
      const newIsMuted = !prev.isMuted;
      toast.info(newIsMuted ? 'Microphone muted' : 'Microphone unmuted');
      return { ...prev, isMuted: newIsMuted };
    });
  };
  
  const toggleVideo = () => {
    setState(prev => {
      const newIsVideoOff = !prev.isVideoOff;
      toast.info(newIsVideoOff ? 'Camera turned off' : 'Camera turned on');
      return { ...prev, isVideoOff: newIsVideoOff };
    });
  };
  
  const toggleScreenShare = () => {
    setState(prev => {
      const newIsScreenSharing = !prev.isScreenSharing;
      toast.info(newIsScreenSharing ? 'Started screen sharing' : 'Stopped screen sharing');
      return { ...prev, isScreenSharing: newIsScreenSharing };
    });
  };
  
  const toggleChat = () => {
    setState(prev => ({ ...prev, isChatOpen: !prev.isChatOpen }));
  };
  
  const endCall = () => {
    toast.info('Ending call...');
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 1000);
  };
  
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };
    
    setState(prev => ({ 
      ...prev, 
      chatMessages: [...prev.chatMessages, userMessage] 
    }));
    
    // Simulate interviewer response after a delay
    setTimeout(() => {
      const responses = [
        "That's a good question. Let me address that.",
        "I appreciate you asking that. Here's what I can tell you.",
        "Great point! I'd be happy to clarify.",
        "Thanks for bringing that up. Let me explain.",
        "That's something I can help with."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const interviewerMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'interviewer',
        text: randomResponse,
        timestamp: new Date()
      };
      
      setState(prev => ({ 
        ...prev, 
        chatMessages: [...prev.chatMessages, interviewerMessage] 
      }));
    }, 1000);
  };
  
  return [
    state,
    { toggleMute, toggleVideo, toggleScreenShare, toggleChat, endCall, sendChatMessage }
  ];
};
