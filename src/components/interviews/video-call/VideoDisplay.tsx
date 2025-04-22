
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { User, MonitorX, Loader2, Clock } from 'lucide-react';
import AIInterviewer from '../mock/AIInterviewer';

interface VideoDisplayProps {
  isConnecting: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  interviewerName: string;
  elapsedTime: number;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  isConnecting,
  isVideoOff,
  isScreenSharing,
  interviewerName,
  elapsedTime
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAI, setIsAI] = useState(false);
  
  // Determine face size based on AI interviewer size
  const getFaceSize = (): "sm" | "md" | "lg" => {
    // Fix: Return a valid size instead of a string literal that doesn't match the type
    return "lg";
  };
  
  // Determine if this is an AI interview based on the interviewerName
  useEffect(() => {
    setIsAI(interviewerName.toLowerCase().includes('ai'));
  }, [interviewerName]);
  
  // Format elapsed time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Setup local video stream
  useEffect(() => {
    if (isConnecting || isVideoOff) return;
    
    const setupVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Failed to get user media:", err);
      }
    };
    
    setupVideoStream();
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isConnecting, isVideoOff]);
  
  // Simulate the interviewer speaking at intervals
  useEffect(() => {
    if (isConnecting) return;
    
    // For AI, simulate random speaking patterns
    // For human interviews, this would represent actual audio detection
    const speakingInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setIsSpeaking(true);
        
        // Random speaking duration between 2-5 seconds
        const speakDuration = Math.floor(Math.random() * 3000) + 2000;
        setTimeout(() => setIsSpeaking(false), speakDuration);
      }
    }, 4000);
    
    return () => clearInterval(speakingInterval);
  }, [isConnecting]);
  
  return (
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden relative">
      <div className="h-[60vh]">
        {isConnecting ? (
          <div className="h-full w-full flex flex-col items-center justify-center bg-gray-900 text-white">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="text-lg">Connecting to interview room...</p>
          </div>
        ) : (
          <div className="h-full w-full grid md:grid-cols-2 gap-4 p-4">
            {/* User video */}
            <div className="relative h-full rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center bg-gray-800">
              {isVideoOff ? (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <User size={64} className="mb-2" />
                  <p>Your camera is off</p>
                </div>
              ) : (
                <>
                  <video 
                    ref={videoRef}
                    autoPlay 
                    muted 
                    playsInline 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-white text-sm">
                    You
                  </div>
                </>
              )}
            </div>

            {/* Interviewer video (AI or Human) */}
            <div className="relative h-full rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-purple-900/50">
              {isAI ? (
                <div className="flex flex-col items-center justify-center">
                  <AIInterviewer isActive={true} isSpeaking={isSpeaking} size={getFaceSize()} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-white">
                  <div className="w-24 h-24 rounded-full bg-gray-700 mb-3 flex items-center justify-center">
                    <User size={48} />
                  </div>
                  <p className="bg-black/30 px-4 py-1 rounded-full">
                    {interviewerName}
                    {isSpeaking && (
                      <span className="inline-block ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    )}
                  </p>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-white text-sm">
                {interviewerName}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Call information overlay */}
      <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full flex items-center">
        <Clock className="h-4 w-4 mr-2" />
        <span>{formatTime(elapsedTime)}</span>
      </div>
    </div>
  );
};

export default VideoDisplay;
