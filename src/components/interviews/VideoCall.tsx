
import React, { useState } from 'react';
import VideoDisplay from './video-call/VideoDisplay';
import VideoCallControls from './video-call/VideoCallControls';
import ChatSidebar from './video-call/ChatSidebar';
import { useVideoCall } from './video-call/useVideoCall';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Settings, Maximize2, MinusCircle } from 'lucide-react';

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
    { isMuted, isVideoOff, isConnecting, elapsedTime, isChatOpen, isScreenSharing, chatMessages },
    { toggleMute, toggleVideo, toggleScreenShare, toggleChat, endCall, sendChatMessage }
  ] = useVideoCall(onEnd);
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEndCallDialog, setShowEndCallDialog] = useState(false);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
        toast.success('Entered fullscreen mode');
      }).catch(err => {
        toast.error('Error attempting to enter fullscreen');
        console.error(err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        toast.success('Exited fullscreen mode');
      }).catch(err => {
        toast.error('Error attempting to exit fullscreen');
        console.error(err);
      });
    }
  };
  
  const handleEndCall = () => {
    setShowEndCallDialog(true);
  };
  
  const confirmEndCall = () => {
    endCall();
    setShowEndCallDialog(false);
  };
  
  const toggleSettingsDialog = () => {
    setShowSettings(!showSettings);
  };
  
  return (
    <div className={`h-full flex flex-col relative ${isFullscreen ? 'bg-black' : ''}`}>
      {/* Main video display area */}
      <VideoDisplay 
        isConnecting={isConnecting}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        interviewerName={interviewerName}
        elapsedTime={elapsedTime}
      />
      
      {/* Call controls */}
      <div className="relative z-10">
        <VideoCallControls 
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          isScreenSharing={isScreenSharing}
          isChatOpen={isChatOpen}
          onToggleMute={toggleMute}
          onToggleVideo={toggleVideo}
          onToggleScreenShare={toggleScreenShare}
          onToggleChat={toggleChat}
          onEndCall={handleEndCall}
          extraControls={[
            {
              icon: <Maximize2 className="h-5 w-5" />,
              label: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
              onClick: toggleFullscreen
            },
            {
              icon: <Settings className="h-5 w-5" />,
              label: "Settings",
              onClick: toggleSettingsDialog
            }
          ]}
        />
      </div>
      
      {/* Chat sidebar */}
      <ChatSidebar 
        isChatOpen={isChatOpen}
        onClose={toggleChat}
        messages={chatMessages}
        onSendMessage={sendChatMessage}
      />
      
      {/* Settings dialog */}
      <AlertDialog open={showSettings} onOpenChange={setShowSettings}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Video Call Settings</AlertDialogTitle>
            <AlertDialogDescription>
              Configure your audio, video, and appearance settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Audio Settings</h3>
              <select className="w-full p-2 border rounded">
                <option>Default Microphone</option>
                <option>Built-in Microphone</option>
                <option>Headset Microphone</option>
              </select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Video Settings</h3>
              <select className="w-full p-2 border rounded">
                <option>Default Camera</option>
                <option>Built-in Webcam</option>
                <option>External Camera</option>
              </select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Appearance</h3>
              <div className="flex items-center">
                <input type="checkbox" id="low-bandwidth" className="mr-2" />
                <label htmlFor="low-bandwidth">Low bandwidth mode</label>
              </div>
              <div className="flex items-center mt-2">
                <input type="checkbox" id="dark-theme" className="mr-2" />
                <label htmlFor="dark-theme">Dark theme</label>
              </div>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              toast.success('Settings saved');
              setShowSettings(false);
            }}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* End call confirmation dialog */}
      <AlertDialog open={showEndCallDialog} onOpenChange={setShowEndCallDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Interview Call?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end this interview call? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEndCall} className="bg-red-600 hover:bg-red-700">
              <MinusCircle className="h-4 w-4 mr-2" />
              End Call
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VideoCall;
