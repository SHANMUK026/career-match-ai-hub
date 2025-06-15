
import React, { Suspense, lazy } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GlobalSearch } from '@/components/common/GlobalSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

// Lazy-loaded components with skeleton fallbacks
const HeroSection = lazy(() => import('@/components/home/HeroSection'));
const CompaniesSection = lazy(() => import('@/components/home/CompaniesSection'));
const HowItWorksSection = lazy(() => import('@/components/home/HowItWorksSection'));
const JobListingsSection = lazy(() => import('@/components/home/JobListingsSection'));
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection'));
const AIChatbot = lazy(() => import('@/components/common/AIChatbot'));

// Enhanced skeleton loaders for each section
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

const HeroSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950">
    <div className="text-center space-y-6 max-w-4xl px-4">
      <Skeleton className="h-16 w-3/4 mx-auto" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
      <div className="max-w-2xl mx-auto">
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="flex justify-center space-x-4">
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>
        
        {/* Enhanced Search Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="py-16 bg-white dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Find Your Dream Job
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Search through thousands of job opportunities from top companies worldwide.
              Use our AI-powered search to find the perfect match for your skills.
            </p>
            <div className="max-w-4xl mx-auto">
              <GlobalSearch />
            </div>
          </div>
        </motion.section>

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
