"use client"
import { useState } from "react";
import { 
  ChevronDown, 
  Search, 
  SlidersHorizontal, 
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2Icon,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  stock: number;
  var: number;
  price: number;
  image: string;
  selected?: boolean;
  highlighted?: boolean;
}

const page = () => {
  const allProducts: Product[] = [
    { 
      id: "132456", 
      name: "Solve Tote Bag Brown", 
      brand: "Uniqlo", 
      stock: 98, 
      var: 2, 
      price: 1400000, 
      image: "/1eebcb48-db20-47d7-894a-8e00dac107d0.png" 
    },
    { 
      id: "299880", 
      name: "Flick Sling Bags Khaki", 
      brand: "Viaval", 
      stock: 34, 
      var: 4, 
      price: 1200000, 
      image: "/1eebcb48-db20-47d7-894a-8e00dac107d0.png" 
    },
    { 
      id: "788898", 
      name: "Spear Wallet Grey", 
      brand: "DSVN", 
      stock: 12, 
      var: 5, 
      price: 5900000 ,
      image: "/1eebcb48-db20-47d7-894a-8e00dac107d0.png" 
    },
    { 
      id: "099878", 
      name: "Backpack Riddley Yellow", 
      brand: "Marks ID", 
      stock: 13, 
      var: 1, 
      price: 2200000, 
      image: "/1eebcb48-db20-47d7-894a-8e00dac107d0.png",
      highlighted: true,
      selected: true
    },
    { 
      id: "099872", 
      name: "Waist Bag Fashpack Navy", 
      brand: "Marks ID", 
      stock: 2, 
      var: 4, 
      price: 4900000 ,
      image: "/1eebcb48-db20-47d7-894a-8e00dac107d0.png",
      selected: true
    },
   
  ];

  const [products, setProducts] = useState<Product[]>(allProducts);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    allProducts.filter(p => p.selected).map(p => p.id)
  );
  const [showDeletButton,setShowDeletButton]=useState<boolean>(false)
  
  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);
  
  // Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setProducts(allProducts);
    } else {
      setProducts(
        allProducts.filter(
          product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.id.includes(query)
        )
      );
    }
    setCurrentPage(1);
  };

  const handleCheckboxChange = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProducts(displayedProducts.map(product => product.id));
      setShowDeletButton(true)
    } else {
      setSelectedProducts([]);
      setShowDeletButton(false)
    }
  };

  // Function to handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`w-8 h-8 flex items-center justify-center text-sm ${
            currentPage === i
              ? "bg-blue-500 text-white rounded"
              : "text-gray-700 hover:bg-gray-200 rounded"
          }`}
        >
          {i}
        </button>
      );
    }
    
    return items;
  };

  return (
    <div className="min-h-screen py-36 bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
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
              <button
                  onClick={() => setShowSort(!showSort)}
                  className="flex items-center gap-1 text-sm cursor-pointer text-gray-600 bg-blue-200 border px-3 py-1.5 rounded"
                >
                  Add new Car <Plus className="h-4 w-4" />
                </button>
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 w-12">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={handleSelectAll}
                      checked={
                        displayedProducts.length > 0 &&
                        displayedProducts.every(product => selectedProducts.includes(product.id))
                      }
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
                {displayedProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    className={
                      product.highlighted 
                        ? "bg-blue-50 border-l-4 border-blue-500" 
                        : ""
                    }
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleCheckboxChange(product.id)}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img 
                            className="h-10 w-10 rounded-sm object-cover" 
                            src={product.image} 
                            alt={product.name} 
                          />
                        </div>
                        <div className="text-sm text-gray-900">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {product.brand}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {product.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {product.var}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                      {product.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col lg:flex-row justify-between items-center pt-4 mt-4 border-t border-gray-200">
            <div className="text-sm text-gray-700 mb-4 lg:mb-0">
              1-10 of {products.length} items
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border rounded disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {renderPaginationItems()}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
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

