"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InventoryFilter {
  id: string;
  label: string;
}

interface Car {
  id: string;
  name: string;
  price: string;
  year: string;
  mileage: string;
  image: string;
}

const InventorySection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters: InventoryFilter[] = [
    { id: "all", label: "ALL" },
    { id: "ford", label: "FORD" },
    { id: "audi", label: "AUDI" },
    { id: "porsche", label: "PORSCHE" },
  ];

  const cars: Car[] = [
    {
      id: "1",
      name: "MERCURY EIGHT MONTEREY 1-2",
      price: "$49,000",
      year: "1950",
      mileage: "72,000 miles",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      id: "2",
      name: "MERCURY EIGHT MONTEREY 3-4",
      price: "$51,500",
      year: "1951",
      mileage: "68,000 miles",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      id: "3",
      name: "MERCURY EIGHT MONTEREY 5-6",
      price: "$55,000",
      year: "1952",
      mileage: "66,000 miles",
      image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80"
    },
    {
      id: "4",
      name: "PORSCHE 960/980",
      price: "$165,000",
      year: "2003",
      mileage: "44,000 miles",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex overflow-x-auto space-x-4 py-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`px-4 py-2 text-sm font-medium uppercase whitespace-nowrap ${
                  activeFilter === filter.id
                    ? "border-b-2 border-primary text-black"
                    : "text-gray-500 hover:text-black"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <button className="p-2 border border-gray-300 hover:bg-gray-200 rounded-sm">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 border border-gray-300 hover:bg-gray-200 rounded-sm">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white shadow-md">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-sm uppercase mb-1">{car.name}</h3>
                <p className="text-primary font-bold mb-3">{car.price}</p>
                <div className="flex items-center text-gray-600 text-xs space-x-2">
                  <span>{car.year}</span>
                  <span>•</span>
                  <span>{car.mileage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InventorySection;
