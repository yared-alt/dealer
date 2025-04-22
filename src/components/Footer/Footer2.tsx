import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 py-10 gap-8">
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">NEEREST DESTINITION</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Wonchi Lake
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Negash Resort
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Woliso Hotel
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-l border-gray-200 pl-6 hidden md:block">
            <h3 className=" font-bold text-gray-800  my-4">WolisohotelHOTEL.COM</h3>
            <Image
              src={'/Wolisohotellogo.svg'}
              alt="Woliso Hotel"
              width={150}
              height={50}
              />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 py-10 gap-8">
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">KNOW US MORE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collection" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                 Car Collections
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                  Contact support team
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                  About amnual Car Importer
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                  Rules and Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="border-l border-gray-200 pl-8 hidden md:block">
            <h3 className="text-base font-bold text-gray-800 mt-10 mb-4">Where Do You Find Us</h3>
            <div className="flex space-x-2 w-[100%]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.64952845431!2d37.96409237459556!3d8.533364491509507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164d283d3fa549ad%3A0x5746e6bcb11a8957!2sHoteela%20Walisoo!5e0!3m2!1sen!2set!4v1744747786087!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div
        className='border-t border-gray-200'
      >

        {/* <div className=" w-[57%] float-right py-6"> */}
          <div className="max-w-7xl py-6 flex justify-center gap-4 mx-auto px-4 sm:px-6 lg:px-8 text-gray-600  text-xs">
            <span>© 2025 Amanual Car Importer</span>
            {/* <div>
              Designed by
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
