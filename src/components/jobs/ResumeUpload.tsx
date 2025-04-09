
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ResumeUploadProps {
  jobId: string;
  jobTitle: string;
  onComplete?: () => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ jobId, jobTitle, onComplete }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    experience: '',
    coverLetter: '',
    willingToRelocate: false
  });
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormValues(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is PDF
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      // Check if file size is less than 5MB
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      setResumeFile(file);
      toast.success('Resume uploaded successfully');
    }
  };
  
  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is PDF
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      // Check if file size is less than 2MB
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should be less than 2MB');
        return;
      }
      
      setCoverLetterFile(file);
      toast.success('Cover letter uploaded successfully');
    }
  };
  
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadComplete(true);
            toast.success('Application submitted successfully!');
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 300);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formValues.firstName || !formValues.lastName || !formValues.email || !resumeFile) {
      toast.error('Please fill in all required fields and upload a resume');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    simulateUpload();
  };
  
  return (
    <Card className="p-6 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-readable">Application for {jobTitle}</h2>
      
      <Tabs defaultValue="basic-info" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="resume">Resume & Cover Letter</TabsTrigger>
          <TabsTrigger value="additional">Additional Details</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="basic-info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-readable-secondary">First Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleFormChange}
                  placeholder="Your first name"
                  required
                  className="border-gray-300 dark:border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-readable-secondary">Last Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleFormChange}
                  placeholder="Your last name"
                  required
                  className="border-gray-300 dark:border-gray-700"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-readable-secondary">Email <span className="text-red-500">*</span></Label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleFormChange}
                placeholder="your.email@example.com"
                required
                className="border-gray-300 dark:border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-readable-secondary">Phone Number</Label>
              <Input 
                id="phone"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={handleFormChange}
                placeholder="+1 (123) 456-7890"
                className="border-gray-300 dark:border-gray-700"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-readable-secondary">LinkedIn Profile</Label>
                <Input 
                  id="linkedin"
                  name="linkedin"
                  value={formValues.linkedin}
                  onChange={handleFormChange}
                  placeholder="linkedin.com/in/yourprofile"
                  className="border-gray-300 dark:border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-readable-secondary">Personal Website/Portfolio</Label>
                <Input 
                  id="website"
                  name="website"
                  value={formValues.website}
                  onChange={handleFormChange}
                  placeholder="yourportfolio.com"
                  className="border-gray-300 dark:border-gray-700"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resume" className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-readable">Upload Resume</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">PDF format only, max 5MB</p>
                
                {resumeFile ? (
                  <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span>{resumeFile.name}</span>
                  </div>
                ) : (
                  <p className="text-sm text-red-500">Required <span className="text-red-500">*</span></p>
                )}
              </div>
              
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleResumeUpload}
              />
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('resume-upload')?.click()}
                  className="mx-auto"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {resumeFile ? 'Change Resume' : 'Select Resume'}
                </Button>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-readable">Upload Cover Letter (Optional)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">PDF format only, max 2MB</p>
                
                {coverLetterFile && (
                  <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 mt-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>{coverLetterFile.name}</span>
                  </div>
                )}
              </div>
              
              <Input
                id="cover-letter-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleCoverLetterUpload}
              />
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('cover-letter-upload')?.click()}
                  className="mx-auto"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {coverLetterFile ? 'Change Cover Letter' : 'Select Cover Letter'}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-readable-secondary">Or Type Your Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formValues.coverLetter}
                onChange={handleFormChange}
                placeholder="Dear Hiring Manager,..."
                className="min-h-[200px] border-gray-300 dark:border-gray-700"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="additional" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-readable-secondary">Years of Relevant Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="text"
                value={formValues.experience}
                onChange={handleFormChange}
                placeholder="e.g., 5 years"
                className="border-gray-300 dark:border-gray-700"
              />
            </div>
            
            <div className="flex items-center space-x-2 py-2">
              <Switch
                id="relocate"
                checked={formValues.willingToRelocate}
                onCheckedChange={(checked) => handleSwitchChange('willingToRelocate', checked)}
              />
              <Label htmlFor="relocate" className="text-readable-secondary">I am willing to relocate for this position</Label>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md mt-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-2" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-300">What happens next?</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    After submitting your application, you'll be directed to take a video interview with our AI assistant. This helps us understand your experience and skills better.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <div className="mt-6 flex justify-end">
            {isUploading ? (
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Uploading application...</span>
                  <span className="text-sm font-medium text-primary">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <Button 
                type="submit" 
                className="bg-primary-gradient"
                disabled={uploadComplete}
              >
                {uploadComplete ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Application Submitted
                  </>
                ) : (
                  'Submit Application & Continue to Video Interview'
                )}
              </Button>
            )}
          </div>
        </form>
      </Tabs>
    </Card>
  );
};

export default ResumeUpload;
