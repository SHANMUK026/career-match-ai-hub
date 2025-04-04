
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface VideoCallState {
  isMuted: boolean;
  isVideoOff: boolean;
  isConnecting: boolean;
  elapsedTime: number;
  isChatOpen: boolean;
  isScreenSharing: boolean;
}

export interface VideoCallActions {
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
  toggleChat: () => void;
  endCall: () => void;
}

export const useVideoCall = (onEnd?: () => void): [VideoCallState, VideoCallActions] => {
  const [state, setState] = useState<VideoCallState>({
    isMuted: false,
    isVideoOff: false,
    isConnecting: true,
    elapsedTime: 0,
    isChatOpen: false,
    isScreenSharing: false
  });
  
  // Simulate connection delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, isConnecting: false }));
      toast.success('Connected to interview room');
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
  
  return [
    state,
    { toggleMute, toggleVideo, toggleScreenShare, toggleChat, endCall }
  ];
};
