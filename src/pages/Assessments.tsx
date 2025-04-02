
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Assessments = () => {
  // Sample assessment data
  const assessments = [
    {
      id: 1,
      title: 'Frontend Development',
      description: 'Test your skills in HTML, CSS, JavaScript, and modern frameworks.',
      duration: '45 minutes',
      questions: 25,
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'Data Science',
      description: 'Assess your knowledge in statistics, machine learning, and data visualization.',
      duration: '60 minutes',
      questions: 30,
      level: 'Advanced'
    },
    {
      id: 3,
      title: 'UX/UI Design',
      description: 'Demonstrate your design thinking and user experience expertise.',
      duration: '40 minutes',
      questions: 20,
      level: 'All Levels'
    },
    {
      id: 4,
      title: 'Project Management',
      description: 'Show your proficiency in project planning, execution, and resource management.',
      duration: '50 minutes',
      questions: 35,
      level: 'Intermediate'
    },
    {
      id: 5,
      title: 'Digital Marketing',
      description: 'Prove your skills in SEO, content marketing, and social media strategy.',
      duration: '35 minutes',
      questions: 30,
      level: 'Beginner'
    },
    {
      id: 6,
      title: 'DevOps Engineering',
      description: 'Validate your knowledge in CI/CD, containerization, and cloud infrastructure.',
      duration: '55 minutes',
      questions: 40,
      level: 'Advanced'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI-Powered Skills Assessments</h1>
            <p className="text-gray-600">Validate your skills and get matched with the perfect job opportunities</p>
          </div>
          
          {/* Hero section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8 mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Boost Your Hiring Chances!</h2>
              <p className="mb-6">Our AI-powered assessments help you showcase your skills to potential employers and increase your chances of landing your dream job.</p>
              <Button className="bg-white text-primary hover:bg-gray-100">Start an Assessment</Button>
            </div>
          </div>
          
          {/* Assessment cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Available Assessments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assessments.map(assessment => (
                <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-primary mb-2">{assessment.title}</h3>
                    <p className="text-gray-700 mb-4">{assessment.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                        {assessment.duration}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                        {assessment.questions} questions
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                        {assessment.level}
                      </span>
                    </div>
                    
                    <Button className="w-full bg-primary-gradient">Take Assessment</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* How it works */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-gradient text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold text-lg mb-2">Choose an Assessment</h3>
                <p className="text-gray-600">Select from our wide range of skill-based assessments tailored to your profession.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-gradient text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold text-lg mb-2">Complete the Test</h3>
                <p className="text-gray-600">Answer questions designed by industry experts and AI to measure your skills accurately.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-gradient text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold text-lg mb-2">Get Matched to Jobs</h3>
                <p className="text-gray-600">Receive personalized job recommendations based on your assessment results.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessments;
