
import React from 'react';
import VideoDisplay from './video-call/VideoDisplay';
import VideoCallControls from './video-call/VideoCallControls';
import ChatSidebar from './video-call/ChatSidebar';
import { useVideoCall } from './video-call/useVideoCall';

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
  const [
    { isMuted, isVideoOff, isConnecting, elapsedTime, isChatOpen, isScreenSharing },
    { toggleMute, toggleVideo, toggleScreenShare, toggleChat, endCall }
  ] = useVideoCall(onEnd);
  
  return (
    <div className="h-full flex flex-col">
      <VideoDisplay 
        isConnecting={isConnecting}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        interviewerName={interviewerName}
        elapsedTime={elapsedTime}
      />
      
      <VideoCallControls 
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        isChatOpen={isChatOpen}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onToggleScreenShare={toggleScreenShare}
        onToggleChat={toggleChat}
        onEndCall={endCall}
      />
      
      <ChatSidebar 
        isChatOpen={isChatOpen}
        onClose={toggleChat}
      />
    </div>
  );
};

export default VideoCall;
