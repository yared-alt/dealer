"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  text: string;
  author: string;
  location: string;
}

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      text: "Best Auto Repair Shop in the World! Everyone here is friendly, honest, and they all really know cars. They have fixed me up with some of the nicest classic cars. They are honest and will stand by their work. I keep coming back to them again and again.",
      author: "Sergio Gimeno Bello",
      location: "Madrid"
    },
    {
      id: "2",
      text: "I have been using Classic Cars for over seven years now. They keep my Ford in top shape without breaking the bank. The most Phillip on a single bill for a large job. I highly recommend their services. All considered.",
      author: "Manuel Arsenio",
      location: "Rome"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Testimonials</h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <blockquote className="italic text-gray-700 text-lg mb-4">"{testimonial.text}"</blockquote>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.location}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <button 
              onClick={prevSlide}
              className="p-2 border border-gray-300 hover:bg-gray-200 rounded-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 border border-gray-300 hover:bg-gray-200 rounded-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
