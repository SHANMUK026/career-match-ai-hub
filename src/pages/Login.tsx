
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';

// Form schema with validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email is too long" })
    .trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password is too long" }),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/payment';
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loginBlocked, setLoginBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    // Check if login is blocked from previous attempts
    const lastBlockTime = localStorage.getItem('loginBlockUntil');
    if (lastBlockTime) {
      const blockUntil = parseInt(lastBlockTime);
      if (blockUntil > Date.now()) {
        setLoginBlocked(true);
        const timeRemaining = Math.ceil((blockUntil - Date.now()) / 1000);
        setBlockTimeRemaining(timeRemaining);
        
        // Set up countdown timer
        const timer = setInterval(() => {
          setBlockTimeRemaining(prev => {
            const newTime = prev - 1;
            if (newTime <= 0) {
              clearInterval(timer);
              setLoginBlocked(false);
              localStorage.removeItem('loginBlockUntil');
              return 0;
            }
            return newTime;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      } else {
        // Block period has expired
        localStorage.removeItem('loginBlockUntil');
      }
    }
    
    // Get stored login attempts
    const storedAttempts = localStorage.getItem('loginAttempts');
    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts));
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Implement rate limiting for login attempts
      if (loginBlocked) {
        toast.error("Too many login attempts. Please try again later.");
        return;
      }
      
      // Update and check login attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts.toString());
      
      if (newAttempts >= 5) {
        // Block login for 15 minutes (900000 ms)
        const blockUntil = Date.now() + 900000;
        localStorage.setItem('loginBlockUntil', blockUntil.toString());
        setLoginBlocked(true);
        setBlockTimeRemaining(900);
        toast.error("Too many login attempts. Please try again in 15 minutes.");
        return;
      }
      
      setIsLoading(true);
      
      // Safely sanitize inputs
      const sanitizedEmail = values.email.trim().toLowerCase();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: values.password,
      });

      if (error) {
        // Generic error message to prevent user enumeration
        toast.error("Login failed. Please check your credentials and try again.");
        console.error("Auth error:", error.message);
        return;
      }

      // Reset login attempts on successful login
      localStorage.removeItem('loginAttempts');
      setLoginAttempts(0);
      
      toast.success("Login successful");
      
      // Redirect to the intended destination or fallback
      navigate(from);
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">Welcome Back</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Log in to your CareerMatchAI account</p>
          </div>

          {loginBlocked && (
            <div className="mb-6 p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  Too many login attempts. Please try again in {Math.floor(blockTimeRemaining / 60)}:{blockTimeRemaining % 60 < 10 ? '0' : ''}{blockTimeRemaining % 60}.
                </p>
              </div>
            </div>
          )}

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
                          autoComplete="email"
                          disabled={loginBlocked || isLoading}
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
                          autoComplete="current-password"
                          disabled={loginBlocked || isLoading}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        disabled={loginBlocked || isLoading}
                      />
                      <label 
                        htmlFor="remember" 
                        className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                  )}
                />
                <Link 
                  to="#" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary-gradient"
                disabled={loginBlocked || isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
