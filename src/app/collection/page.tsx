"use client"

import React, { useEffect, useState } from 'react';
import FilterButton from '@/components/Collection/FilterButton';
import CarCard from '@/components/Collection/CarCard';
import { Car, CarCollectionType, Pagination } from '@/type/Car';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { toast } from 'sonner';



const page = () => {
  const [products, setProducts] = useState<Car[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<number>(products?.length || 0);
  const [page, setPage] = useState<number>(1)
  const [paginetion, setPaginetion] = useState<Pagination>();
  const [loading, setLoading] = useState<boolean>();
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [showManufacturer, setShowManufacturer] = useState<boolean>(false);
  const [showRating, setShowRating] = useState<boolean>(false);
  const [showType, setShowType] = useState<boolean>(false);
  const [price, setPrice] = useState<string | null>()
  const [manufacture, setManufacture] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [rating, setReting] = useState<string>("")

  const priceList = [' under $1,000,000', '$1,000,000-3,000,000', '$3,000,000-5,000,000', '$5,000,000-10,000,000', ' above $10,000,000']
  const manufactureList = ['Toyota', 'Mitsubishi', 'Honda', 'Mazda']
  const typeList = ['Sedan', 'SUV', 'Hatchback']
  const ratingList = ['★★★★★', '★★★★☆', '★★★☆☆']

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        price:price,
        category,
        page: page.toString(),
        condition: condition,
        limit: '10'
      });
      const url = `/api/Car/filtercar?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) {
        toast.error(
          "Failed to get product. please try again!",
        );
        return;
      }
      const { data, pagination, message } = await res.json();
      setProducts(data);
      setPaginetion(pagination)

    } catch (error) {
      console.log(error)
      toast.error("Enquiry sent", {
        description: "server is not responding please try again!",
      });
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => { fetchProducts() }, [page]);




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


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setProducts(products);
    } else {
      setProducts(
        products?.filter(
          product =>
            product.CarName.toLowerCase().includes(query.toLowerCase()) ||
            product.CarBrand.toLowerCase().includes(query.toLowerCase()) ||
            product._id.includes(query)
        )
      );
    }
    setPage(1);
  }

  return (
    <div className="container mx-auto  px-4">

      <div className="flex flex-wrap gap-3 pt-20 mb-8 justify-between">
        <div className="relative w-[100%]  translate-y-12 md:translate-y-8 lg:translate-y-2 md:w-[25%] lg:w-[40%]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by Name, Brand, Variant etc..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex-grow md:flex-grow-0 "></div>
        <div className="flex flex-wrap gap-3 justify-end translate-y-12 md:translate-y-8 lg:translate-y-2">
          <div className="relative">
            <button
              onClick={() => setShowPrice(!showPrice)}
              className={`flex items-center gap-2 px-3 py-0.5 md:px-4 md:py-2 rounded-full border`}
            >
              Price: {price} <ChevronDown className="h-4 w-4" />
            </button>
            {showPrice && (
              <>
                <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                  <div className="py-1">
                    {
                      priceList?.map((each) => (
                        <>
                          <button
                            onClick={() => {
                              setPrice(each)
                              setShowPrice(false)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {each}
                          </button>
                        </>
                      ))
                    }
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowManufacturer(!showManufacturer)}
              className={`flex items-center gap-2 px-3 py-0.5 md:px-4 md:py-2 rounded-full border`}
            >
              Manufacturer: {manufacture} <ChevronDown className="h-4 w-4" />
            </button>
            {showManufacturer && (
              <>
                {
                  <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                    <div className="py-1">
                      {
                        manufactureList?.map((each) => (
                          <button
                            onClick={() => {
                              setManufacture(each)
                              setShowManufacturer(false)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {each}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                }
              </>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowType(!showType)}
              className={`flex items-center gap-2 px-3 py-0.5 md:px-4 md:py-2 rounded-full border`}
            >
              Type: {type} <ChevronDown className="h-4 w-4" />
            </button>
            {showType && (

              <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                <div className="py-1">
                  {
                    typeList?.map((each) => (
                      <button
                        onClick={() => {
                          setType(each)
                          setShowType(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {each}
                      </button>
                    ))
                  }
                </div>
              </div>

            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowRating(!showRating)}
              className={`flex items-center gap-2 px-3 py-0.5 md:px-4 md:py-2 rounded-full border`}
            >
              Rating: {rating} <ChevronDown className="h-4 w-4" />
            </button>
            {showRating && (
              <>
                <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                  <div className="py-1">
                    {
                      ratingList?.map((each) => (
                        <button
                          onClick={() => {
                            setReting(each)
                            setShowRating(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          {each}
                        </button>
                      ))
                    }
                  </div>
                </div>
              </>
            )}
          </div>
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
