
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'weekly' | 'annually' | null>(null);

  const handlePaymentSuccess = (plan: 'monthly' | 'weekly' | 'annually') => {
    // In a real app, this would process the payment via a payment gateway
    toast.success(`Successfully subscribed to the ${plan} plan!`);
    navigate('/dashboard');
  };

  const plans = [
    {
      id: 'weekly',
      name: 'Weekly',
      price: '$9.99',
      priceDescription: 'per week',
      description: 'Perfect for quick job searches',
      features: [
        'Access to all job listings',
        'Basic AI job matching',
        'Weekly reports',
        'Apply to up to 10 jobs'
      ],
      mostPopular: false,
      color: 'bg-blue-100'
    },
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$29.99',
      priceDescription: 'per month',
      description: 'Best value for active job seekers',
      features: [
        'Access to all job listings',
        'Advanced AI job matching',
        'Detailed analytics and reports',
        'Unlimited job applications',
        'Priority support'
      ],
      mostPopular: true,
      color: 'bg-purple-100'
    },
    {
      id: 'annually',
      name: 'Annually',
      price: '$249.99',
      priceDescription: 'per year',
      description: 'Save 30% with annual billing',
      features: [
        'Everything in Monthly',
        'Career development resources',
        'Resume review by experts',
        'Interview preparation sessions',
        'Job satisfaction guarantee'
      ],
      mostPopular: false,
      color: 'bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Choose Your Subscription Plan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the plan that best fits your job search needs. All plans give you access to our AI-driven job matching and career tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative ${selectedPlan === plan.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'} transition-all duration-300`}
              >
                {plan.mostPopular && (
                  <Badge className="absolute top-4 right-4 bg-primary-gradient">Most Popular</Badge>
                )}
                <CardHeader className={`${plan.color} rounded-t-lg`}>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm ml-2 text-gray-600">{plan.priceDescription}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.mostPopular ? 'bg-primary-gradient' : ''}`}
                    variant={plan.mostPopular ? 'default' : 'outline'}
                    onClick={() => {
                      setSelectedPlan(plan.id as 'monthly' | 'weekly' | 'annually');
                      handlePaymentSuccess(plan.id as 'monthly' | 'weekly' | 'annually');
                    }}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              All plans include a 7-day money-back guarantee. You can cancel your subscription at any time.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-primary" 
                onClick={() => navigate('/')}
              >
                Return to home
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
