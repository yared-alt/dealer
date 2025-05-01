import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from "./ContactUsForm";

function ContactUs() {
  return (
    <div>
      <div className="bg-white py-6 pt-52 px-4  md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-right text-sm text-gray-600">
            <p className="mb-4">Kirkos, Addis Ababa | Ethiopia </p>
            <div className="flex flex-col md:flex-row md:justify-end gap-4 md:gap-8">
              <a href="tel:+35020079000" className="flex items-center justify-center md:justify-end gap-2 hover:text-gray-900 transition-colors">
                <Phone size={16} />
                <span>+251 911 201 930 </span>
              </a>

              <a href="#" className="flex items-center justify-center md:justify-end gap-2 hover:text-gray-900 transition-colors">
                <Mail size={16} />
                <span>Email us</span>
              </a>

              <a href="#" className="flex items-center justify-center md:justify-end gap-2 hover:text-gray-900 transition-colors">
                <MapPin size={16} />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ContactForm />

      <div className="w-full h-64 md:h-96 bg-gray-200 relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.64952845431!2d37.96409237459556!3d8.533364491509507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164d283d3fa549ad%3A0x5746e6bcb11a8957!2sHoteela%20Walisoo!5e0!3m2!1sen!2set!4v1744747786087!5m2!1sen!2set"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
      </div>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-center gap-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Mail size={18} className="text-gray-600" />
            <span className="text-sm">
              <strong>General Enquiries: </strong>
              <a href="mailto:info@amanual.com" className="hover:text-gray-900 transition-colors">
                info@amanual.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
