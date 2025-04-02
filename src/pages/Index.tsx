
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CompaniesSection from '@/components/home/CompaniesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import JobListingsSection from '@/components/home/JobListingsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AIChatbot from '@/components/common/AIChatbot';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CompaniesSection />
        <HowItWorksSection />
        <JobListingsSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
