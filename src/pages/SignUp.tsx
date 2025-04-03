
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AccountCreationForm, { signUpSchema } from '@/components/auth/AccountCreationForm';
import ProfileCreationForm from '@/components/auth/ProfileCreationForm';
import SignUpContainer from '@/components/auth/SignUpContainer';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<any>(null);
  
  const handleAccountCreation = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data?.user) {
        toast.success("Account created successfully!");
        setUserData({
          email: values.email,
          id: data.user.id
        });
        setStep(2);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    }
  };

  const handleProfileCreated = async (profileData: any) => {
    try {
      // The profile is automatically created by the trigger
      // We can update it directly using a string literal for the table name
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.firstName,
          last_name: profileData.lastName
        } as any) // Use type assertion to bypass TypeScript check
        .eq('id', userData.id);
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success("Profile created successfully!");
      navigate('/payment');
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <>
      {step === 1 ? (
        <SignUpContainer 
          title="Create an Account" 
          subtitle="Join CareerMatchAI to find your dream job"
        >
          <AccountCreationForm onSubmit={handleAccountCreation} />
        </SignUpContainer>
      ) : (
        <SignUpContainer 
          title="Complete Your Profile" 
          subtitle="Tell us a bit about yourself"
        >
          <ProfileCreationForm onProfileCreated={handleProfileCreated} userData={userData} />
        </SignUpContainer>
      )}
    </>
  );
};

export default SignUp;
