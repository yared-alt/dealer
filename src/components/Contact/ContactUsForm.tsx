"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/sonner";
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
    privacyPolicy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, privacyPolicy: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyPolicy) {
      alert("Please agree to the privacy policy")
      return;
    }

    
    try {
      setIsSubmitting(true);
      const Formd = new FormData();
      Formd.append("email", formData.email)
      Formd.append("name", formData.name)
      Formd.append("subject", formData.subject)
      Formd.append("message", formData.message)

      const res = await fetch("/api/sendmessage", {
        method: "POST",
        body: Formd as FormData
      });

  
       if(!res.ok){
         alert("Ooops network error please try again")
         toast.error("Failed to send enquiry", {
          description: "Please try again later.",
        });
        }else{
         alert("message sent")
         toast.success("Enquiry sent", {
          description: "Thank you for your enquiry. We'll get back to you soon.",
        });
       }

        setFormData({
          name: '',
          email: '',
          message: '',
          subject: '',
          privacyPolicy: false
        });
        setIsSubmitting(false);

    } catch (error) {
      alert("Enquiry faild please try again !!!!")
      return;
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#D3E4FD]/80 py-12 px-4 md:px-8 rounded-sm">
      <Toaster position="bottom-right" />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-800 mb-6 inline-block border-b-2 border-gray-400 pb-2">
          Make an Enquiry
        </h2>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
              name='subject'
              value={formData.subject}
              onChange={()=>handleChange}
              required
              className='w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option disabled >select subject</option>
                <option>Ask for car import</option>
                <option>Ask for payment option</option>
                <option>Ask warrenty</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacyPolicy"
              checked={formData.privacyPolicy}
              onCheckedChange={handleCheckboxChange}
              className="data-[state=checked]:bg-green-600 border-gray-400"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="privacyPolicy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree with the <a href="#" className="text-green-700 underline">Terms & Policy</a>
              </label>
            </div>
          </div>

          <div className="text-right">
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              disabled={isSubmitting}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-2 rounded-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
