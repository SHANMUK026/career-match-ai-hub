
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, CheckCircle2, X, FileCheck, FilePlus2 } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface ResumeUploadProps {
  jobId: string | number;
  jobTitle: string;
}

const applicationSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  earliestStartDate: z.string().min(1, "Please select a start date"),
  coverLetter: z.string().optional(),
  salaryExpectation: z.string().optional(),
  linkedInProfile: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  portfolioWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  additionalNotes: z.string().optional(),
  heardFrom: z.string().optional(),
  references: z.string().optional(),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

const ResumeUpload: React.FC<ResumeUploadProps> = ({ jobId, jobTitle }) => {
  const [file, setFile] = useState<File | null>(null);
  const [additionalDoc, setAdditionalDoc] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [step, setStep] = useState(1);
  
  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      earliestStartDate: '',
      coverLetter: '',
      salaryExpectation: '',
      linkedInProfile: '',
      portfolioWebsite: '',
      additionalNotes: '',
      heardFrom: '',
      references: '',
    },
  });
  
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
  
  const handleAdditionalDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setAdditionalDoc(selectedFile);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please upload your resume');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setStep(2);
      toast.success('Resume uploaded successfully!');
    }, 1500);
  };
  
  const onSubmit = (values: ApplicationValues) => {
    setIsUploading(true);
    
    // Simulate application submission
    setTimeout(() => {
      setIsUploading(false);
      setStep(3);
      toast.success('Application submitted successfully!', {
        description: 'We will review your application and get back to you soon.',
        duration: 5000,
      });
    }, 1500);
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Apply for {jobTitle}</h2>
      
      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="firstName" className="block mb-2">First Name*</Label>
              <Input 
                id="firstName" 
                type="text"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="block mb-2">Last Name*</Label>
              <Input 
                id="lastName" 
                type="text"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="block mb-2">Email Address*</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="block mb-2">Phone Number*</Label>
              <Input 
                id="phone" 
                type="tel"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="resume" className="block mb-2">Upload Resume (PDF)*</Label>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start mb-6">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-green-800">Resume Uploaded Successfully!</h3>
                <p className="text-sm text-green-600">Your resume has been uploaded. Please provide additional information below.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField
                control={form.control}
                name="earliestStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Earliest Start Date*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="salaryExpectation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Expectation</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. $80,000 - $100,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField
                control={form.control}
                name="linkedInProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://linkedin.com/in/yourusername" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="portfolioWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio/Website (Optional)</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://your-portfolio.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <Label htmlFor="additional-doc" className="block mb-2">Additional Documents (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                {!additionalDoc ? (
                  <div className="text-center">
                    <FilePlus2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-4 text-sm text-gray-500">Upload certifications, references, or other relevant documents</p>
                    <Label htmlFor="additional-doc-upload" className="cursor-pointer">
                      <Button size="sm" type="button">
                        <Upload className="h-4 w-4 mr-2" />
                        Browse Files
                      </Button>
                      <Input 
                        id="additional-doc-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleAdditionalDocChange}
                      />
                    </Label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white p-3 rounded border">
                    <div className="flex items-center">
                      <FileCheck className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <p className="font-medium">{additionalDoc.name}</p>
                        <p className="text-xs text-gray-500">{(additionalDoc.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setAdditionalDoc(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-gray-500">Maximum file size: 5MB. PDF, DOC, or DOCX formats accepted.</p>
            </div>
            
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional information that might be relevant to your application..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-primary-gradient"
                disabled={isUploading || !form.formState.isValid}
              >
                {isUploading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </Form>
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
