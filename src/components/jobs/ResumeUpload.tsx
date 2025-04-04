
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, CheckCircle2, X } from 'lucide-react';
import { toast } from 'sonner';

interface ResumeUploadProps {
  jobId: string | number;
  jobTitle: string;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ jobId, jobTitle }) => {
  const [file, setFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [step, setStep] = useState(1);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Check if file is a PDF
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setFile(selectedFile);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setStep(2);
      toast.success('Resume uploaded successfully!');
    }, 1500);
  };
  
  const handleFinalSubmit = () => {
    setIsUploading(true);
    
    // Simulate application submission
    setTimeout(() => {
      setIsUploading(false);
      setStep(3);
      toast.success('Application submitted successfully!');
    }, 1500);
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Apply for {jobTitle}</h2>
      
      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="resume" className="block mb-2">Upload Resume (PDF)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              {!file ? (
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-4 text-sm text-gray-500">Drag and drop your resume here, or click to browse</p>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button size="sm" type="button">
                      <Upload className="h-4 w-4 mr-2" />
                      Browse Files
                    </Button>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf" 
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white p-3 rounded border">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">Maximum file size: 5MB. PDF format only.</p>
          </div>
          
          <div>
            <Label htmlFor="cover-letter" className="block mb-2">Cover Letter (Optional)</Label>
            <Textarea 
              id="cover-letter" 
              placeholder="Write a brief cover letter explaining why you're a good fit for this position..."
              className="min-h-[150px]"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-primary-gradient"
              disabled={!file || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Continue'}
            </Button>
          </div>
        </form>
      )}
      
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-800">Resume Uploaded Successfully!</h3>
              <p className="text-sm text-green-600">Your resume has been uploaded. Please provide additional information below.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="earliest-start" className="block mb-2">Earliest Start Date</Label>
              <Input 
                id="earliest-start" 
                type="date" 
              />
            </div>
            
            <div>
              <Label htmlFor="salary-expectation" className="block mb-2">Salary Expectation</Label>
              <Input 
                id="salary-expectation" 
                type="text" 
                placeholder="e.g. $80,000 - $100,000"
              />
            </div>
            
            <div>
              <Label htmlFor="linkedin" className="block mb-2">LinkedIn Profile (Optional)</Label>
              <Input 
                id="linkedin" 
                type="url" 
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
            
            <div>
              <Label htmlFor="portfolio" className="block mb-2">Portfolio/Website (Optional)</Label>
              <Input 
                id="portfolio" 
                type="url" 
                placeholder="https://your-portfolio.com"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              className="bg-primary-gradient"
              onClick={handleFinalSubmit}
              disabled={isUploading}
            >
              {isUploading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-6">Your application for <strong>{jobTitle}</strong> has been submitted successfully. We'll review your application and get back to you soon.</p>
          <div className="space-y-3">
            <Button 
              className="w-full bg-primary-gradient"
              onClick={() => window.location.href = '/jobs'}
            >
              Browse More Jobs
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResumeUpload;
