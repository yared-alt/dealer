import React from 'react';
import { Car } from '@/type/Car';
import Image from 'next/image';


const CarCard: React.FC<Car> = (car) => {
  const { CarName, CarBrand, Price, FrontImage, Size,  } = car;

  return (
    <div className={`bg-white rounded-lg p-6 hover:py-8 shadow-sm transition-all hover:border-2 border-rentNow `}>
      <h3 className="text-lg font-medium mb-2">{CarName}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">${Price}</span>
      </div>
      
      <div className="w-full mb-4">
        <Image
          src={`https://res.cloudinary.com/dr1ejpdn8/image/upload/${FrontImage}`} 
          alt={CarName} 
          width={500}
          height={500}
          className="w-full h-auto object-contain" 
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        {specs.map((spec, index) => (
          <div key={index} className="flex flex-col  items-center">
            <span className="text-gray-400">
              {spec.icon}
            </span>
            <span className="text-sm text-gray-600">{spec.value}</span>
          </div>
        ))}
      </div>
      
      {rentNow && (
        <button className="w-full mt-4 bg-rentNow text-white py-2 rounded-md flex items-center justify-center gap-2">
          Rent Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default CarCard;
