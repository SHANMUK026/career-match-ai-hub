
import React from 'react';
import { User, CheckCircle, ArrowRight, PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const HowItWorksSection = () => {
  const steps = [
    {
      title: 'Create Your Profile',
      description: 'Build your professional profile with skills, experience, and preferences.',
      icon: <User className="w-10 h-10 text-primary" />,
      animation: 'fade-in',
      path: '/signup'
    },
    {
      title: 'Take AI Assessments',
      description: 'Complete skill-based assessments to verify your expertise and highlight strengths.',
      icon: <CheckCircle className="w-10 h-10 text-primary" />,
      animation: 'fade-in delay-100',
      path: '/assessments'
    },
    {
      title: 'Get Matched to Jobs',
      description: 'Our AI algorithms match you with the most suitable job opportunities.',
      icon: <ArrowRight className="w-10 h-10 text-primary" />,
      animation: 'slide-in-right delay-200',
      path: '/jobs'
    },
    {
      title: 'Get Hired & Start Working!',
      description: 'Interview, receive offers, and begin your new career journey.',
      icon: <PartyPopper className="w-10 h-10 text-primary" />,
      animation: 'fade-in delay-300',
      path: '/mock-interview'
    }
  ];

  const handleStepClick = (path: string, title: string) => {
    toast.info(`Navigating to ${title}`);
  };

  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our simple process helps you find your dream job with AI-powered matching
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Link 
              to={step.path} 
              key={index} 
              className="block transform transition-all duration-300 hover:translate-y-[-5px]"
              onClick={() => handleStepClick(step.path, step.title)}
            >
              <div 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
                <div className="mt-4 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white flex items-center justify-center text-lg font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="ghost" className="text-primary hover:text-primary-dark flex items-center group">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
