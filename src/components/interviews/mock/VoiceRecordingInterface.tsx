
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, StopCircle, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface VoiceRecordingInterfaceProps {
  onAudioRecorded: (audioBlob: Blob) => void;
  onRecordingStateChange: (isRecording: boolean) => void;
  maxDuration?: number; // in seconds
  isDisabled?: boolean;
}

const VoiceRecordingInterface: React.FC<VoiceRecordingInterfaceProps> = ({
  onAudioRecorded,
  onRecordingStateChange,
  maxDuration = 120,
  isDisabled = false,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    setRecordingTime(0);
    setAudioURL(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        onAudioRecorded(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      onRecordingStateChange(true);

      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= maxDuration) {
            stopRecording();
          }
          return newTime;
        });
      }, 1000);

      toast.success('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      onRecordingStateChange(false);

      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      toast.success('Recording completed');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = (recordingTime / maxDuration) * 100;

  return (
    <div className="space-y-4">
      {isRecording && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Recording in progress</span>
            <span>{formatTime(recordingTime)} / {formatTime(maxDuration)}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}
      
      <div className="flex space-x-3">
        {!isRecording ? (
          <Button 
            onClick={startRecording} 
            disabled={isDisabled}
            className="bg-primary-gradient"
          >
            <Mic className="mr-2 h-4 w-4" />
            Start Recording
          </Button>
        ) : (
          <Button 
            onClick={stopRecording}
            variant="destructive"
          >
            <StopCircle className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        )}
        
        {audioURL && (
          <audio 
            src={audioURL} 
            controls 
            className="h-10 mt-1"
          />
        )}
      </div>
    </div>
  );
};

export default VoiceRecordingInterface;
