"use client"
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 col-span-1">
            <h3 className="font-bold text-lg uppercase mb-4">IS Your Car Not Here?</h3>
            <p className="text-gray-700 mb-6">
              Tell us your email and we will notice you when we have your dream car
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border border-gray-300 rounded"
                required
              />
              <Button className="bg-primary hover:bg-primary/90 text-white uppercase text-sm font-bold">
                Sign Up For New Car
              </Button>
            </form>
          </div>
          
          <div className="col-span-1 md:col-span-2 bg-gray-900 p-6 text-white">
            <h3 className="font-bold text-lg uppercase mb-4">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">11206 Sam Rayburn Fort, WA 98431</p>
                <p className="mb-2">T: 734-123-4567</p>
                <p className="mb-4">E: info@classiccars.org</p>
              </div>
              <div className="space-y-4">
                <Button className="bg-primary hover:bg-primary/90 text-white uppercase text-sm font-bold w-full">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
