"use client"

import HeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServicesSection";
import TeamServiceSection from "@/components/Home/TeamServiceSection";
import InventorySection from "@/components/Home/InventorySection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import BrandsSection from "@/components/Home/BrandsSection";
import NewsletterSection from "@/components/Home/NewsletterSection"

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <TeamServiceSection />
        <InventorySection />
        <TestimonialsSection />
        <BrandsSection />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default page;