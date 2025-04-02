
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Mail, Lock, User, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileCreationForm from '@/components/auth/ProfileCreationForm';

const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and privacy policy",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<any>(null);
  
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log(values);
    // In a real app, this would make an API call to create the account
    toast.success("Account created successfully!");
    setUserData({
      email: values.email,
      // In a real app, you would never store the password in state
      // This is just for demonstration purposes
    });
    setStep(2);
  };

  const handleProfileCreated = (profileData: any) => {
    // In a real app, this would update the user profile in the database
    console.log("Profile data:", profileData);
    toast.success("Profile created successfully!");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          {step === 1 ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-primary">Create an Account</h1>
                <p className="text-sm text-gray-600 mt-1">Join CareerMatchAI to find your dream job</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="you@example.com" 
                              className="pl-10" 
                              {...field} 
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              className="pl-10" 
                              {...field} 
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              className="pl-10" 
                              {...field} 
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-600">
                            I agree to the{" "}
                            <Link to="#" className="text-primary hover:underline">
                              Terms of Service
                            </Link>
                            {" "}and{" "}
                            <Link to="#" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-primary-gradient">
                    Create Account
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary hover:underline font-medium">
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-primary">Complete Your Profile</h1>
                <p className="text-sm text-gray-600 mt-1">Tell us a bit about yourself</p>
              </div>
              
              <ProfileCreationForm onProfileCreated={handleProfileCreated} userData={userData} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
