
import React, { Suspense, lazy } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy-loaded components with skeleton fallbacks
const HeroSection = lazy(() => import('@/components/home/HeroSection'));
const CompaniesSection = lazy(() => import('@/components/home/CompaniesSection'));
const HowItWorksSection = lazy(() => import('@/components/home/HowItWorksSection'));
const JobListingsSection = lazy(() => import('@/components/home/JobListingsSection'));
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection'));
const AIChatbot = lazy(() => import('@/components/common/AIChatbot'));

// Skeleton loaders for each section
const SectionSkeleton = () => (
  <div className="w-full py-12">
    <Skeleton className="h-10 w-1/3 mx-auto mb-4" />
    <Skeleton className="h-4 w-2/3 mx-auto mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <Skeleton className="h-48 rounded-lg" />
      <Skeleton className="h-48 rounded-lg" />
      <Skeleton className="h-48 rounded-lg" />
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<SectionSkeleton />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CompaniesSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <HowItWorksSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <JobListingsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AIChatbot />
      </Suspense>
    </div>
  );
};

export default Index;
