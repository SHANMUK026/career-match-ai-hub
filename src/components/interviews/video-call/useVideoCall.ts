
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
  availableDevices: {
    audioinput: MediaDeviceInfo[];
    videoinput: MediaDeviceInfo[];
    audiooutput: MediaDeviceInfo[];
  };
  selectedDevices: {
    audioinput?: string;
    videoinput?: string;
    audiooutput?: string;
  };
}

export interface VideoCallActions {
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
  toggleChat: () => void;
  endCall: () => void;
  sendChatMessage: (text: string) => void;
  changeDevice: (kind: 'audioinput' | 'videoinput' | 'audiooutput', deviceId: string) => void;
}

const defaultDevices = {
  audioinput: [],
  videoinput: [],
  audiooutput: []
};

export const useVideoCall = (onEnd?: () => void): [VideoCallState, VideoCallActions] => {
  const [state, setState] = useState<VideoCallState>({
    isMuted: false,
    isVideoOff: false,
    isConnecting: true,
    elapsedTime: 0,
    isChatOpen: false,
    isScreenSharing: false,
    chatMessages: [],
    availableDevices: defaultDevices,
    selectedDevices: {}
  });
  
  // Enumerate available devices when the component mounts
  useEffect(() => {
    const getAvailableDevices = async () => {
      try {
        // Request permissions first
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        
        const groupedDevices = devices.reduce((acc, device) => {
          if (device.kind in acc) {
            acc[device.kind as keyof typeof defaultDevices].push(device);
          }
          return acc;
        }, {
          audioinput: [] as MediaDeviceInfo[],
          videoinput: [] as MediaDeviceInfo[],
          audiooutput: [] as MediaDeviceInfo[]
        });
        
        // Get default devices
        const defaultAudioInput = groupedDevices.audioinput.find(d => d.deviceId === 'default') || groupedDevices.audioinput[0];
        const defaultVideoInput = groupedDevices.videoinput.find(d => d.deviceId === 'default') || groupedDevices.videoinput[0];
        const defaultAudioOutput = groupedDevices.audiooutput.find(d => d.deviceId === 'default') || groupedDevices.audiooutput[0];
        
        setState(prev => ({
          ...prev,
          availableDevices: groupedDevices,
          selectedDevices: {
            audioinput: defaultAudioInput?.deviceId,
            videoinput: defaultVideoInput?.deviceId,
            audiooutput: defaultAudioOutput?.deviceId
          }
        }));
        
        toast.success('Camera and microphone access granted');
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Failed to access camera or microphone. Please check your permissions.');
      }
    };
    
    getAvailableDevices();
    
    // Listen for device changes
    navigator.mediaDevices.addEventListener('devicechange', getAvailableDevices);
    
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getAvailableDevices);
    };
  }, []);
  
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
      const currentlySharing = prev.isScreenSharing;
      
      if (!currentlySharing) {
        // Request screen sharing
        navigator.mediaDevices.getDisplayMedia({ video: true })
          .then(() => {
            setState(prevState => ({
              ...prevState,
              isScreenSharing: true
            }));
            toast.success('Screen sharing started');
          })
          .catch(error => {
            console.error('Error starting screen share:', error);
            toast.error('Failed to start screen sharing');
          });
      } else {
        // Stop screen sharing (in a real implementation, we would track and stop the track)
        setState(prevState => ({
          ...prevState,
          isScreenSharing: false
        }));
        toast.info('Screen sharing stopped');
      }
      
      return prev; // Return unchanged state, we'll update it in the promises
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
  
  const changeDevice = (kind: 'audioinput' | 'videoinput' | 'audiooutput', deviceId: string) => {
    setState(prev => ({
      ...prev,
      selectedDevices: {
        ...prev.selectedDevices,
        [kind]: deviceId
      }
    }));
    
    toast.success(`Changed ${kind === 'audioinput' ? 'microphone' : kind === 'videoinput' ? 'camera' : 'speaker'}`);
  };
  
  return [
    state,
    { toggleMute, toggleVideo, toggleScreenShare, toggleChat, endCall, sendChatMessage, changeDevice }
  ];
};
