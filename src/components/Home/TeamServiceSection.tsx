"use client"


import { Button } from "@/components/ui/button";

const TeamServiceSection = () => {
  return (
    <section className="py-10 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Our team wants to be of service to you!</h2>
          <p className="text-gray-300 max-w-2xl mx-auto md:mx-0 mb-4 md:mb-0 text-center md:text-left">
            Let our team of car enthusiasts help you with the best car services for all professional vehicles.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white uppercase font-bold">
            Find Out More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamServiceSection;
