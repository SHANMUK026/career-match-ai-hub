
import React from 'react';
import { Camera, MonitorUp } from 'lucide-react';

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
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
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
  );
};

export default VideoDisplay;
