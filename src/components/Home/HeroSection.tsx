"use client"

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[500px]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex flex-col justify-center h-full max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            TURN THE IDEA OF BUYING A CLASSIC CAR INTO A DREAM INTO REALITY
          </h1>
          <p className="text-white text-lg mb-8">
            Enjoy the classic driving experience with a superior classic car experience.
          </p>
          <Button className="bg-primary hover:bg-primary/90 w-fit text-white uppercase font-bold px-6 py-6">
            View Our Inventory
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;