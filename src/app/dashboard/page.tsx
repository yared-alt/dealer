"use client"
import { useState,useEffect } from "react";
import { 
  ChevronDown, 
  Search, 
  SlidersHorizontal, 
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";

interface Pagination {
  page:number,
  limit:number,
  totalcount:number,
  totalPages:number,
  hasNext: boolean,
  hasPrev: boolean,
  nextPage: number | null,
  prevPage: number | null,
}
export interface Car {
  _id: string
  id?: string
  CarName: string
  CarBrand: string
  FrontImage: string
  Model: string
  MileGone: number
  SupportImages: string[]
  Catagory: string
  SubCategory: string
  DiscountedAmount: number
  WarrantyGiven: string
  Description: string
  Price: number
  FuelType:string
  Color: string
  Size: string
  Condition: string
  Transmission: string
  Silinder: number
  Year: number
  IsNew: boolean
  Review: number
  IsPopular: boolean
  InStock: boolean
  Selected?:boolean
}

const page = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [page,setPage]=useState<number>(1)
  const [totalPages, setTotalPages]=useState<number>(0)
  const [paginetion,setPaginetion]=useState<Pagination>()
  const [products, setProducts] = useState<Car[]>();
  const [showSort, setShowSort] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [color,setColor]= useState<string>("")
  const [category,setCatagory]= useState<string>("")
  const [selectedProducts, setSelectedProducts] = useState<string[] | []>(
  products ? products.filter(p => p.Selected).map(p => p._id) : [""]
  );
  const [showDeletButton,setShowDeletButton]=useState<boolean>(false)
  


  const fetchProducts = async () => {
    const res = await fetch(`/api/car/filtercar?color=${color}&category=${category}?page=${page}&limit=10`);
    const { data, pagination } = await res.json();
    setProducts(data);
    setPaginetion(pagination)
    setTotalPages(pagination.totalPages);
  };
  useEffect(() => { fetchProducts() }, [page]);


  const handleCheckboxChange = (productId: string) => {


      if (selectedProducts.length !>= 0) {
        return;
      }else{
        const diferrent=[]
        selectedProducts.forEach((p,i)=>{
           if (p.includes(productId)) {
            return;
           }else{
            diferrent.push(selectedProducts[i]);
            setSelectedProducts(prev =>[...prev,productId])
           }
             setSelectedProducts(prev=>
              prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
          );
        })
      }

      setSelectedProducts(prev=>
          prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev,productId]
      );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProducts(products ? products.map(product => product.id));
      setShowDeletButton(true)
    } else {
      setSelectedProducts([]);
      setShowDeletButton(false)
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setProducts(products);
    } else {
      setProducts(
        products.filter(
          product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.id.includes(query)
        )
      );
    }
    setPage(1);
  };


  return (
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
                  Show: All Cars <ChevronDown className="h-4 w-4" />
                </button>
                {showFilter && (
                  <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                    <div className="py-1">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        All Cars
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Active Cars
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                  Sort by: Default <ChevronDown className="h-4 w-4" />
                </button>
                {showSort && (
                  <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-48">
                    <div className="py-1">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Default
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Name (A-Z)
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Price (Low to High)
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                      onChange={handleSelectAll}
                      // checked={
                      //   displayedProducts.length > 0 &&
                      //   displayedProducts.every(product => selectedProducts.includes(product.id))
                      // }
                    />
                  </th>
                  <th className="uppercase px-4 py-3 text-left  flex gap-2 align-middletext-xs font-medium text-gray-500 tracking-wider">
                    <p className="pt-1">
                    CAR NAME
                    </p>
                    {
                        showDeletButton ?
                        <Trash2Icon className=" pt-1 cursor-pointer"/> : ""
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
                        checked={selectedProducts.length >=0 ? selectedProducts.includes(product._id)}
                        onChange={() => handleCheckboxChange(product._id)}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img 
                            className="h-10 w-10 rounded-sm object-cover" 
                            src={product.FrontImage} 
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
                   onClick={() => setPage(p => Math.max(1, p-1))} 
                   disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {/* {renderPaginationItems()} */}
              <button
                 onClick={() => setPage(p => Math.min(totalPages, p+1))} 
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
  );
};

export default page;

