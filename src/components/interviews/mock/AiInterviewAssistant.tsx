
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ThumbsUp, ThumbsDown, Lightbulb, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type AiFeedback = {
  suggestion: string;
  strength?: string;
  improvement?: string;
};

interface AiInterviewAssistantProps {
  question: string;
  answer: string;
  isAnalyzing?: boolean;
}

export const AiInterviewAssistant = ({ question, answer, isAnalyzing = false }: AiInterviewAssistantProps) => {
  const [feedback, setFeedback] = useState<AiFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const generateFeedback = () => {
    setLoading(true);
    // Simulate AI feedback generation - in a real app, this would call your AI service
    setTimeout(() => {
      setFeedback({
        suggestion: "Try focusing more on specific examples and quantifiable results when describing your experience.",
        strength: "Good articulation of the problem-solving approach and technical skills.",
        improvement: "Consider adding more information about how your solution impacted business outcomes."
      });
      setLoading(false);
      toast.success("AI analysis complete!");
    }, 1500);
  };

  useEffect(() => {
    // Reset feedback when question or answer changes
    setFeedback(null);
    setExpanded(false);
  }, [question, answer]);

  return (
    <Card className="border-0 shadow-sm overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-100 dark:border-blue-900">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/50 dark:to-indigo-900/50">
        <CardTitle className="flex items-center text-lg">
          <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
          AI Interview Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              <p className="font-medium">Analyzing your answer...</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Our AI is evaluating your response for content, clarity, and delivery
            </p>
          </div>
        ) : answer ? (
          <>
            {!feedback ? (
              <div className="flex flex-col items-center py-3">
                <p className="text-gray-600 dark:text-gray-400 mb-3 text-center">
                  Get professional feedback on your interview answer
                </p>
                <Button
                  onClick={generateFeedback}
                  className="button-hover-effect bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> 
                      Analyze My Answer
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Suggestion</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.suggestion}</p>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pt-1"
                      >
                        <div className="flex items-start gap-2">
                          <ThumbsUp className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Strengths</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.strength}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <ThumbsDown className="h-5 w-5 text-orange-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Areas for Improvement</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.improvement}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="pt-1 flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 dark:text-blue-400"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? "Show Less" : "Show Full Analysis"}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </>
        ) : (
          <div className="text-center py-4 text-gray-600 dark:text-gray-400">
            <p>Submit your answer to receive AI feedback</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
