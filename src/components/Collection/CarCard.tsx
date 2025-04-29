import React from 'react';
import { CarCollectionType } from '@/type/Car';
import Image from 'next/image';

interface CarCardProps {
  car: CarCollectionType;
  highlighted?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, highlighted = false }) => {
  const { name, price, image, specs, rentNow } = car;

  return (
    <div className={`bg-white rounded-lg p-6 hover:py-8 shadow-sm transition-all ${highlighted ? 'border-2 border-rentNow' : ''}`}>
      <h3 className="text-lg font-medium mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-500 text-sm">/day</span>
      </div>
      
      <div className="w-full mb-4">
        <Image
          src={image} 
          alt={name} 
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
