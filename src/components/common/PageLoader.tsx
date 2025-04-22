
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-blue-50/20 dark:from-gray-900 dark:to-blue-950/20">
      <div className="w-full max-w-md space-y-6 p-6">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
            <svg className="h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="space-y-3 text-center">
          <Skeleton className="h-9 w-3/4 mx-auto bg-blue-200/50 dark:bg-blue-800/30" />
          <Skeleton className="h-4 w-2/3 mx-auto bg-blue-100/50 dark:bg-blue-900/20" />
        </div>
        <div className="space-y-4 mt-8">
          <Skeleton className="h-24 w-full rounded-lg bg-white/80 dark:bg-gray-800/50 shadow-sm" />
          <Skeleton className="h-24 w-full rounded-lg bg-white/80 dark:bg-gray-800/50 shadow-sm" />
          <Skeleton className="h-24 w-full rounded-lg bg-white/80 dark:bg-gray-800/50 shadow-sm" />
        </div>
        <div className="flex justify-center mt-6">
          <div className="loading-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
