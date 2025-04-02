
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Software Engineer',
    company: 'TechCorp',
    testimonial: 'The AI matching was incredible! I found a job that perfectly matched my skills and work preferences within two weeks.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Product Manager',
    company: 'Innovation Labs',
    testimonial: 'The skill assessments gave me confidence during interviews and helped me stand out from other candidates.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'UX Designer',
    company: 'Creative Solutions',
    testimonial: 'As someone switching careers, CareerMatchAI helped me highlight my transferable skills and find companies willing to take a chance on me.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 4,
    name: 'David Wilson',
    position: 'Marketing Director',
    company: 'Growth Partners',
    testimonial: 'The personalized job recommendations saved me countless hours of searching. I found my dream role in just days!',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how job seekers like you found their perfect career match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8 relative">
                <Quote className="absolute top-6 left-6 text-gray-200 w-12 h-12 -z-10" />
                <p className="text-gray-700 mb-6 relative z-10">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.position} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
