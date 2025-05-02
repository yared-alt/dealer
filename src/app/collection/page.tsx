"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { toast } from 'sonner';

import CarCard from '@/components/Collection/CarCard';
import { Car, CarCollectionType, Pagination } from '@/type/Car';

const page = () => {
  const [products, setProducts] = useState<Car[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<number>(products?.length || 0);
  const [page, setPage] = useState<number>(1);
  const [paginetion, setPaginetion] = useState<Pagination>();
  const [loading, setLoading] = useState<boolean>();
  
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [showbrand, setShowbrand] = useState<boolean>(false);
  const [showCondition, setShowCondition] = useState<boolean>(false);
  const [showType, setShowType] = useState<boolean>(false);
  
  const [price, setPrice] = useState<string>();
  const [brand, setbrand] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [condition, setCondition] = useState<string>("");

  const priceList = [
    'under $1,000,000', 
    '$1,000,000-3,000,000', 
    '$3,000,000-5,000,000', 
    '$5,000,000-10,000,000', 
    'above $10,000,000'
  ];
  
  const brandList = ['Toyota', 'Mitsubishi', 'Honda', 'Mazda'];
  const typeList = ['Sedan', 'SUV', 'Hatchback'];
  const conditionList = ['new', 'used', 'slightly-used'];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        price: price,
        type: type,
        brand: brand,
        page: page.toString(),
        condition: condition,
        limit: '30'
      });
      
      const url = `/api/Car/filtercollection?${params.toString()}`;
      const res = await fetch(url);
      console.log(res)
      if (!res.ok) {
        toast.error("Failed to get product. please try again!");
        return;
      }
      
      const { data, pagination, message } = await res.json();
      setProducts(data);
      setPaginetion(pagination);
    } catch (error) {
      console.log(error);
      toast.error("Enquiry sent", {
        description: "server is not responding please try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProducts() 
  }, []);

  useEffect(() => { 
    fetchProducts() 
  }, [price,condition,brand,type]);

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
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap gap-3 pt-20 mb-8 justify-between">
        <div className="relative w-[100%] translate-y-12 md:translate-y-8 lg:translate-y-2 md:w-[25%] lg:w-[40%]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by Name, Brand, Variant etc..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        <div className="flex-grow md:flex-grow-0"></div>
        
        <div className="flex flex-wrap gap-3 justify-end translate-y-12 md:translate-y-8 lg:translate-y-2">
          <div className="relative">
            <button
              onClick={() => setShowPrice(!showPrice)}
              className={`flex items-center gap-2 px-3 py-0.5 md:px-4 md:py-2 rounded-full border`}
            >
              Price: {price} <ChevronDown className="h-4 w-4" />
            </button>
            {showPrice && (
              <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                <div className="py-1">
                  {priceList?.map((each) => (
                    <button
                      onClick={() => {
                        setPrice(each);
                        setShowPrice(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {each}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowbrand(!showbrand)}
              className={`flex items-center gap-2 px-3 py-0.5 md:px-4 md:py-2 rounded-full border`}
            >
              brandr: {brand} <ChevronDown className="h-4 w-4" />
            </button>
            {showbrand && (
              <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                <div className="py-1">
                  {brandList?.map((each) => (
                    <button
                      onClick={() => {
                        setbrand(each);
                        setShowbrand(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {each}
                    </button>
                  ))}
                </div>
              </div>
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
                  {typeList?.map((each) => (
                    <button
                      onClick={() => {
                        setType(each);
                        setShowType(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {each}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowCondition(!showCondition)}
              className={`flex items-center gap-2 px-3 py-0.5 md:px-4 md:py-2 rounded-full border`}
            >
              Condition: {condition} <ChevronDown className="h-4 w-4" />
            </button>
            {showCondition && (
              <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                <div className="py-1">
                  {conditionList?.map((each) => (
                    <button
                      onClick={() => {
                        setCondition(each);
                        setShowCondition(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {each}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((car) => (
          <Link href={`collection/${car.id}`}>
            <CarCard key={car._id} car={car} />
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