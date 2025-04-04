
import React from 'react';
import { Button } from '@/components/ui/button';
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
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

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
  onEndCall
}) => {
  return (
    <div className="bg-gray-100 py-4 px-6 rounded-b-lg">
      <div className="flex justify-between items-center">
        <div className="space-x-1">
          <Button 
            variant={isMuted ? "destructive" : "outline"} 
            size="icon"
            onClick={onToggleMute}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button 
            variant={isVideoOff ? "destructive" : "outline"} 
            size="icon"
            onClick={onToggleVideo}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className="space-x-1">
          <Button 
            variant={isScreenSharing ? "destructive" : "outline"}
            size="icon"
            onClick={onToggleScreenShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button 
            variant={isChatOpen ? "secondary" : "outline"} 
            size="icon"
            onClick={onToggleChat}
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
          onClick={onEndCall}
          className="rounded-full px-6"
        >
          <Phone className="h-5 w-5 mr-2 rotate-135" />
          End
        </Button>
      </div>
    </div>
  );
};

export default VideoCallControls;
