
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Camera, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  MessageSquare, 
  Users, 
  MoreVertical, 
  Share2,
  MonitorUp
} from 'lucide-react';
import { toast } from 'sonner';

interface VideoCallProps {
  interviewId: string;
  interviewerName?: string;
  onEnd?: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ 
  interviewId, 
  interviewerName = 'Sarah Johnson',
  onEnd 
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  // Simulate connection delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
      toast.success('Connected to interview room');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Timer for call duration
  useEffect(() => {
    if (!isConnecting) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isConnecting]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? 'Microphone unmuted' : 'Microphone muted');
  };
  
  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast.info(isVideoOff ? 'Camera turned on' : 'Camera turned off');
  };
  
  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.info(isScreenSharing ? 'Stopped screen sharing' : 'Started screen sharing');
  };
  
  const endCall = () => {
    toast.info('Ending call...');
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 1000);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow relative bg-black rounded-lg overflow-hidden">
        {/* Main video screen */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isConnecting ? (
            <div className="text-center text-white">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg font-medium">Connecting to interview...</p>
              <p className="text-sm opacity-80">Please wait</p>
            </div>
          ) : isVideoOff ? (
            <div className="text-center text-white">
              <div className="w-20 h-20 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-semibold">{interviewerName.charAt(0)}</span>
              </div>
              <p className="text-lg">{interviewerName}</p>
            </div>
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Interviewer" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Self view */}
        <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg">
          {isVideoOff ? (
            <div className="h-full flex items-center justify-center bg-gray-800 text-white">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
              alt="Self view" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Call duration */}
        <div className="absolute top-4 left-4 bg-black/50 text-white py-1 px-3 rounded-full text-sm">
          {formatTime(elapsedTime)}
        </div>
        
        {/* Screen sharing indicator */}
        {isScreenSharing && (
          <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-full text-sm flex items-center">
            <MonitorUp className="w-3 h-3 mr-1" />
            Sharing screen
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="bg-gray-100 py-4 px-6 rounded-b-lg">
        <div className="flex justify-between items-center">
          <div className="space-x-1">
            <Button 
              variant={isMuted ? "destructive" : "outline"} 
              size="icon"
              onClick={toggleMute}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button 
              variant={isVideoOff ? "destructive" : "outline"} 
              size="icon"
              onClick={toggleVideo}
            >
              {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="space-x-1">
            <Button 
              variant={isScreenSharing ? "destructive" : "outline"}
              size="icon"
              onClick={toggleScreenShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button 
              variant={isChatOpen ? "secondary" : "outline"} 
              size="icon"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
            >
              <Users className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            variant="destructive" 
            onClick={endCall}
            className="rounded-full px-6"
          >
            <Phone className="h-5 w-5 mr-2 rotate-135" />
            End
          </Button>
        </div>
      </div>
      
      {/* Chat sidebar - would be expanded in a real implementation */}
      {isChatOpen && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg p-4 border-l">
          <h3 className="font-medium mb-3 flex justify-between items-center">
            Interview Chat
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </h3>
          <div className="h-full flex items-center justify-center text-gray-500">
            Chat would be implemented here
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
