"use client"

import React, { useState } from 'react';
import FilterButton from '@/components/Collection/FilterButton';
import CarCard from '@/components/Collection/CarCard';
import { CarCollectionType } from '@/type/Car';
import Link from 'next/link';



const page = () => {


  const [activeFilters, setActiveFilters] = useState({
    price: false,
    manufacture: false,
    type: false,
    rating: false
  });

  // State for selected filter values
  const [filterValues, setFilterValues] = useState({
    price: '',
    manufacture: '',
    type: '',
    rating: ''
  });

  // Filter options
  const filterOptions = {
    price: ['Under $40', '$40-$50', '$50-$60', 'Above $60'],
    manufacture: ['Toyota', 'Mitsubishi', 'Honda', 'Mazda'],
    type: ['Sedan', 'SUV', 'Hatchback'],
    rating: ['★★★★★', '★★★★☆', '★★★☆☆']
  };

  // Sample car data
  const cars = [
    { id: 1, name: "Toyota New Yaris", price: 42, manufacture: "Toyota", type: "Hatchback", rating: "★★★★☆" },
    { id: 2, name: "Pajero Sport", price: 46, manufacture: "Mitsubishi", type: "SUV", rating: "★★★★★" },
    { id: 3, name: "Honda Civic", price: 52, manufacture: "Honda", type: "Sedan", rating: "★★★★☆" },
    { id: 4, name: "Mazda CX-3", price: 54, manufacture: "Mazda", type: "SUV", rating: "★★★☆☆" }
  ];

  // Toggle filter dropdown
  const toggleFilter = (filter: keyof typeof activeFilters) => {
    setActiveFilters(prev => {
      // First close all filters
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        return { ...acc, [key]: false };
      }, {} as Record<keyof typeof activeFilters, boolean>);
      
      // Then toggle the current filter
      return { ...allClosed, [filter]: !prev[filter] };
    });
  };

  // Handle filter selection
  const handleFilterSelect = (filter, value) => {
    setFilterValues(prev => ({
      ...prev,
      [filter]: prev[filter] === value ? '' : value // Toggle selection
    }));
    setActiveFilters(prev => ({ ...prev, [filter]: false })); // Close dropdown
  };

  // Apply filters to cars
  const filteredCars = cars.filter(car => {
    return (
      (!filterValues.price || 
        (filterValues.price === 'Under $40' && car.price < 40) ||
        (filterValues.price === '$40-$50' && car.price >= 40 && car.price <= 50) ||
        (filterValues.price === '$50-$60' && car.price >= 50 && car.price <= 60) ||
        (filterValues.price === 'Above $60' && car.price > 60)) &&
      (!filterValues.manufacture || car.manufacture === filterValues.manufacture) &&
      (!filterValues.type || car.type === filterValues.type) &&
      (!filterValues.rating || car.rating === filterValues.rating)
    );
  });


  const carsData: CarCollectionType[] = [
    {
      id: '1',
      name: 'Toyota New Yaris',
      price: 42,
      image: '/1.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '5 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ]
    },
    {
      id: '2',
      name: 'Pajero Sport',
      price: 46,
      image: '/2.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '5 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '34 MPG'
        },
      ]
    },
    {
      id: '3',
      name: 'Honda Civic',
      price: 52,
      image: '/3.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2v2H3v-2h2"></path><path d="M8 17V5l8 2v10"></path>
            </svg>
          ),
          value: 'Auto'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '5 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '28 MPG'
        },
      ]
    },
    {
      id: '4',
      name: 'Mazda CX-3',
      price: 54,
      image: '/4.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2v2H3v-2h2"></path><path d="M8 17V5l8 2v10"></path>
            </svg>
          ),
          value: 'Auto'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '5 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ]
    },
    {
      id: '5',
      name: 'BMW X5',
      price: 56,
      image: '/5.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '9 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '42 MPG'
        },
      ]
    },
    {
      id: '6',
      name: 'Honda Jazz RS',
      price: 58,
      image: '/6.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '5 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ],
      rentNow: true
    },
    {
      id: '7',
      name: 'Aston Martin V12',
      price: 60,
      image: '/7.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2v2H3v-2h2"></path><path d="M8 17V5l8 2v10"></path>
            </svg>
          ),
          value: 'Auto'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '2 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ]
    },
    {
      id: '8',
      name: 'Toyota New Yaris',
      price: 63,
      image: '/3.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '8 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '34 MPG'
        },
      ]
    },
    
    {
      id: '9',
      name: 'Honda Jazz RS',
      price: 58,
      image: '/6.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '5 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ],
      rentNow: true
    },
    {
      id: '10',
      name: 'Aston Martin V12',
      price: 60,
      image: '/7.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2v2H3v-2h2"></path><path d="M8 17V5l8 2v10"></path>
            </svg>
          ),
          value: 'Auto'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '2 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ]
    },
    {
      id: '11',
      name: 'Toyota New Yaris',
      price: 63,
      image: '/3.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '8 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '34 MPG'
        },
      ]
    },
    
    {
      id: '12',
      name: 'Honda Jazz RS',
      price: 58,
      image: '/6.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '5 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ],
      rentNow: true
    },
    {
      id: '13',
      name: 'Aston Martin V12',
      price: 60,
      image: '/7.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2v2H3v-2h2"></path><path d="M8 17V5l8 2v10"></path>
            </svg>
          ),
          value: 'Auto'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '2 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ]
    },
    {
      id: '14',
      name: 'Toyota New Yaris',
      price: 63,
      image: '/3.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '8 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '34 MPG'
        },
      ]
    },
    
    {
      id: '15',
      name: 'Honda Jazz RS',
      price: 58,
      image: '/6.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '5 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ],
      rentNow: true
    },
    {
      id: '16',
      name: 'Aston Martin V12',
      price: 60,
      image: '/7.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2v2H3v-2h2"></path><path d="M8 17V5l8 2v10"></path>
            </svg>
          ),
          value: 'Auto'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '2 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ]
    },
    {
      id: '17',
      name: 'Toyota New Yaris',
      price: 63,
      image: '/3.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '8 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '34 MPG'
        },
      ]
    },
    
    {
      id: '18',
      name: 'Honda Jazz RS',
      price: 58,
      image: '/6.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '5 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ],
      rentNow: true
    },
    {
      id: '19',
      name: 'Aston Martin V12',
      price: 60,
      image: '/7.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2v2H3v-2h2"></path><path d="M8 17V5l8 2v10"></path>
            </svg>
          ),
          value: 'Auto'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '2 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '24 MPG'
        },
      ]
    },
    {
      id: '20',
      name: 'Toyota New Yaris',
      price: 63,
      image: '/3.png',
      specs: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
            </svg>
          ),
          value: 'Manual'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M5 20a7 7 0 0 1 10 0"></path><path d="M19 20a7 7 0 0 0-10 0"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect>
            </svg>
          ),
          value: '8 Seats'
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7v10a2 2 0 0 1-2 2h-1"></path>
              <path d="M14 17H8"></path>
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3"></path>
            </svg>
          ),
          value: '34 MPG'
        },
      ]
    }
  ];

  return (
    <div className="container mx-auto  px-4">

      <div className="flex flex-wrap gap-3 pt-20 mb-8 justify-between">
        <div className="flex-grow md:flex-grow-0"></div>
        <div className="flex flex-wrap gap-3 justify-end">
        <FilterButton
          label="Price" 
          isActive={activeFilters.price}
          onClick={() => toggleFilter('price')}
        />
        <FilterButton
          label="Manufacture" 
          // count={filterCounts.manufacture}
          isActive={activeFilters.manufacture}
          onClick={() => toggleFilter('manufacture')}
        />
        <FilterButton 
          label="Type" 
          // count={filterCounts.type}
          isActive={activeFilters.type}
          onClick={() => toggleFilter('type')}
        />
        <FilterButton
          label="Rating" 
          isActive={activeFilters.rating}
          onClick={() => toggleFilter('rating')}
        />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {carsData.map((car) => (
          <Link href={`collection/${car.id}`}>
            <CarCard key={car.id} car={car} highlighted={car.id === '6'} />
          </Link>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-blue-500 text-white text-center py-3 md:hidden">
        <a href="#" className="font-medium">
          Visit site
        </a>
      </div>
    </div>
  );
};

export default page;
