
import React, { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface SignUpContainerProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const SignUpContainer = ({ children, title, subtitle }: SignUpContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpContainer;
