
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AccountCreationForm, { signUpSchema } from '@/components/auth/AccountCreationForm';
import ProfileCreationForm from '@/components/auth/ProfileCreationForm';
import SignUpContainer from '@/components/auth/SignUpContainer';
import { z } from 'zod';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<any>(null);
  
  const handleAccountCreation = (values: z.infer<typeof signUpSchema>) => {
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
    
    // Set auth token to simulate successful authentication
    localStorage.setItem('auth_token', 'dummy-token');
    localStorage.setItem('user_email', userData.email);
    
    toast.success("Profile created successfully!");
    navigate('/payment');
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
