
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTheme } from '@/contexts/ThemeContext';

const Payment = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'weekly' | 'annually' | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Log that the component has mounted successfully
    console.log("Payment page mounted successfully");
  }, []);

  const handlePaymentSuccess = (plan: 'monthly' | 'weekly' | 'annually') => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast.success(`Successfully subscribed to the ${plan} plan!`);
      navigate('/dashboard');
    }, 1500);
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
      color: isDark ? 'bg-blue-950/50' : 'bg-blue-100'
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
      color: isDark ? 'bg-purple-950/50' : 'bg-purple-100'
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
      color: isDark ? 'bg-green-950/50' : 'bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Choose Your Subscription Plan</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
                  <Badge className="absolute top-4 right-4 bg-primary">Most Popular</Badge>
                )}
                <CardHeader className={`${plan.color} rounded-t-lg`}>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm ml-2 text-muted-foreground">{plan.priceDescription}</span>
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
                    className={`w-full ${plan.mostPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.mostPopular ? 'default' : 'outline'}
                    onClick={() => {
                      setSelectedPlan(plan.id as 'monthly' | 'weekly' | 'annually');
                      handlePaymentSuccess(plan.id as 'monthly' | 'weekly' | 'annually');
                    }}
                    disabled={loading}
                  >
                    {loading && selectedPlan === plan.id ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck size={16} />
              <p>Secure payment processing</p>
              <CreditCard size={16} className="ml-4" />
              <p>Major credit cards accepted</p>
            </div>
            
            <p className="text-sm text-muted-foreground">
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
