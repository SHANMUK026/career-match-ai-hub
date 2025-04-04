
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, Share, MessageSquare, PhoneOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ControlButtonProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  variant?: 'default' | 'destructive' | 'outline';
  onClick: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ 
  label, 
  icon, 
  active = false, 
  variant = 'default',
  onClick 
}) => (
  <TooltipProvider delayDuration={300}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size="lg"
          className={`rounded-full flex flex-col items-center justify-center p-3 ${
            active ? 'bg-primary text-white' : variant === 'destructive' ? 'bg-red-500 hover:bg-red-600' : ''
          }`}
          onClick={onClick}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export interface ExtraControl {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

interface VideoCallControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  isChatOpen: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onToggleChat: () => void;
  onEndCall: () => void;
  extraControls?: ExtraControl[];
}

const VideoCallControls: React.FC<VideoCallControlsProps> = ({
  isMuted,
  isVideoOff,
  isScreenSharing,
  isChatOpen,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onToggleChat,
  onEndCall,
  extraControls = []
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-6 py-4 rounded-full shadow-lg flex items-center space-x-4">
      <ControlButton
        label={isMuted ? "Unmute" : "Mute"}
        icon={isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        active={!isMuted}
        onClick={onToggleMute}
      />
      
      <ControlButton
        label={isVideoOff ? "Turn Camera On" : "Turn Camera Off"}
        icon={isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
        active={!isVideoOff}
        onClick={onToggleVideo}
      />
      
      <ControlButton
        label={isScreenSharing ? "Stop Sharing" : "Share Screen"}
        icon={<Share className="h-6 w-6" />}
        active={isScreenSharing}
        onClick={onToggleScreenShare}
      />
      
      <ControlButton
        label={isChatOpen ? "Close Chat" : "Open Chat"}
        icon={<MessageSquare className="h-6 w-6" />}
        active={isChatOpen}
        onClick={onToggleChat}
      />
      
      {extraControls.map((control, index) => (
        <ControlButton
          key={index}
          label={control.label}
          icon={control.icon}
          active={control.active}
          onClick={control.onClick}
        />
      ))}
      
      <div className="w-px h-10 bg-gray-600 mx-2"></div>
      
      <ControlButton
        label="End Call"
        icon={<PhoneOff className="h-6 w-6" />}
        variant="destructive"
        onClick={onEndCall}
      />
    </div>
  );
};

export default VideoCallControls;
