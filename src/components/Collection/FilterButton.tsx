
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface FilterButtonProps {
  label: string;
  count?: number;
  onClick?: () => void;
}

const price= ['Under $40', '$40-$50', '$50-$60', 'Above $60']
const manufacture= ['Toyota', 'Mitsubishi', 'Honda', 'Mazda']
const type= ['Sedan', 'SUV', 'Hatchback']
const rating= ['★★★★★', '★★★★☆', '★★★☆☆']


const FilterButton = ({ label, count = 0, isActive, onClick }:{label:string,count?:number,isActive:boolean, onClick?:()=>void}) => {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-0.5 md:px-4 md:py-2 rounded-full border ${
        isActive ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
      }`}
      onClick={onClick}
    >
      <span>{label}</span>
      {count > 0 && (
        <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
      <span>{isActive ? '▲' : '▼'}</span>
    </button>
  );
};

export default FilterButton;