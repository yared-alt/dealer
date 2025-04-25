"use client"
import { useState, useEffect } from "react";
import React from "react";
import {
  ChevronDown,
  Search,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2Icon,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { Car, Pagination } from "@/type/Car";


const Page = () => {

  const [carList,setCarList]=useState("All Cars")
  const [sortBy,setSortBy]=useState("Default")
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [paginetion, setPaginetion] = useState<Pagination>()
  const [products, setProducts] = useState<Car[]>();
  const [showSort, setShowSort] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [color, setColor] = useState<string>("")
  const [category, setCatagory] = useState<string>("")
  const [condition, setCondition] = useState<string>("")
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    products?.filter(p => p.Selected).map(p => p._id) ?? []
  );
  const [finalSelectedProducts,setFinalSelectedProducts]=useState<string[]>([]);

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        color,
        category,
        page: page.toString(),
        condition: condition,
        limit: '10'
      });
      const url = `/api/Car/filtercar?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) {
        const {message}=await res.json()
       alert(message)
     }
      const { data, pagination } = await res.json();
      setProducts(data);
      setPaginetion(pagination)
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.log("error on fetching mybe network")
      return;
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => { fetchProducts() }, [page]);

  
  useEffect(()=>{
    setFinalSelectedProducts(selectedProducts)
  },[selectedProducts])
  
  const updateTrashCan=():boolean=>{
    if (finalSelectedProducts.length>0) {
      return true;
    }else{
      return false
    }
  }
  const isShow=updateTrashCan();

  const deleteProduct=async ()=>{

    try {
      setLoading(true)
      const params = new URLSearchParams({
        ids:finalSelectedProducts.join(",")
      }).toString();
      const url=`api/delete?${params}`
      const response=await fetch(url,{method:"DELETE"});
      if (!response.ok) {
        alert("response is not ok")
      }
      const {message}=await response.json()
      alert(message)
    } catch (error) {
      alert("cann not delete product")
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  
  const handleCheckboxChange = ({event,productId}: {event:React.ChangeEvent<HTMLInputElement>,productId:string}) => {
    console.log("finalselectedproduct",finalSelectedProducts)
    console.log(productId)
     setSelectedProducts(prev=>
      prev.includes(productId) ? prev.filter(id=> id !== productId ) : [...prev,productId])
  };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if(checked){
      const allpro:string[]=[];
      products?.forEach(p=>{
        allpro.push(p._id)
      })
      setSelectedProducts(allpro)
    }else{
      setSelectedProducts([])
    }
  };

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
    <>{
      loading ? (
        <h1 className="pt-72">Loading ...</h1>
      ) : (

        <div className="min-h-screen py-36 bg-gray-50">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold text-gray-900 mr-4">Cars List</h1>
                  <div className="relative">
                    <button
                      onClick={() => setShowFilter(!showFilter)}
                      className="flex items-center gap-1 text-sm text-gray-600 border px-3 py-1.5 rounded"
                    >
                      Show: {carList} <ChevronDown className="h-4 w-4" />
                    </button>
                    {showFilter && (
                      <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                        <div className="py-1">
                          <button
                          onClick={()=>{
                            setCarList("All Cars")
                            setShowFilter(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            All Cars
                          </button>
                          <button
                          onClick={()=>{
                            setCarList("Active Cars")
                            setShowFilter(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Active Cars
                          </button>
                          <button
                          onClick={()=>{
                            setCarList("Out of Stock")
                            setShowFilter(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Out of Stock
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full lg:w-auto">
                  <div className="relative">
                    <Link href="/dashboard/upload"
                      className="flex items-center gap-1 text-sm cursor-pointer text-gray-600 bg-blue-200 border px-3 py-1.5 rounded">
                      Add new Car <Plus className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => setShowSort(!showSort)}
                      className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer border px-3 py-1.5 rounded"
                    >
                      Sort by: {sortBy} <ChevronDown className="h-4 w-4" />
                    </button>
                    {showSort && (
                      <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                        <div className="py-1">
                          <button
                          onClick={()=>{
                            setSortBy("Default")
                            setShowSort(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Default
                          </button>
                          <button
                          onClick={()=>{
                            setSortBy("Name (A-Z)")
                            setShowSort(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Name (A-Z)
                          </button>
                          <button
                          onClick={()=>{
                            setSortBy("Price (Low to High)")
                            setShowSort(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Price (Low to High)
                          </button>
                          <button
                          onClick={()=>{
                            setSortBy("Stock (Low to High)")
                            setShowSort(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Stock (Low to High)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="flex items-center justify-center border p-1.5 rounded">
                    <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by Name, Brand, Variant etc..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 w-12">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={(e)=>handleSelectAll(e)}
                        />
                      </th>
                      <th className="uppercase px-4 py-3 text-left  flex gap-2 align-middletext-xs font-medium text-gray-500 tracking-wider">
                        <p className="pt-1">
                          CAR NAME
                        </p>
                        {
                          isShow ?
                            <Trash2Icon
                            onClick={deleteProduct}
                            className=" pt-1 cursor-pointer" /> : ""
                        }
                      </th>
                      <th className="uppercase px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Brand
                      </th>
                      <th className="uppercase px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Fuel
                      </th>
                      <th className="uppercase px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Year
                      </th>
                      <th className="uppercase px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Silinder
                      </th>
                      <th className="uppercase px-4 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products?.map((product) => (
                      <tr
                        key={product.id}
                        className={
                          product.IsPopular
                            ? "bg-blue-50 border-l-4 border-blue-500"
                            : ""
                        }
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedProducts.includes(product._id)}
                            onChange={(e) => handleCheckboxChange({event:e,productId:product._id})}
                          />
                          <Link href={`dashboard/edit/${product._id}`}>
                              <Pencil className="mx-4"/>
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3">
                              <img
                                className="h-10 w-10 rounded-sm object-cover"
                                src={`https://res.cloudinary.com/dr1ejpdn8/image/upload/${product.FrontImage}`}
                                alt={product.CarName}
                              />
                            </div>
                            <div className="text-sm text-gray-900">{product.CarName}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.CarBrand}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product._id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.Model}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {product.FuelType}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                          {product.Price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col lg:flex-row justify-between items-center pt-4 mt-4 border-t border-gray-200">
                <div className="text-sm text-gray-700 mb-4 lg:mb-0">
                  1-10 of {paginetion?.totalcount} items
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {/* {renderPaginationItems()} */}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    </>

  )
};

export default Page;

