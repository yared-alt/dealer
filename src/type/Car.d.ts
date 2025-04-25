export interface SerializedProduct {
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
    Color: string[]
    Size: string
    Condition: string
    Transmission: string
    Silinder: number
    Year: number
    IsNew: boolean
    Review: number
    IsPopular: boolean
    InStock: boolean
    createdAt?: string
    updatedAt?: string
  }
  
  export interface MongoProduct extends Omit<SerializedProduct, '_id' | 'createdAt' | 'updatedAt'> {
    _id: Object
    createdAt?: Date
    updatedAt?: Date
  }

  export interface Pagination {
    page: number,
    limit: number,
    totalcount: number,
    totalPages: number,
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
    Category: string
    SubCategory: string
    DiscountedAmount: number
    WarrantyGiven: string
    Description: string
    Price: number
    FuelType: string
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
    Selected?: boolean
  }
  

  export interface CloudinaryResult {
    public_id: string,
    [key: string]: any,
  }
  
  
  export interface GETSINGLECAR {
    success: boolean
    message?: string
    singlecar?: Car
    relatedcars?: DashboardCar[]
  }

  export interface Filter{
    Color?:string, 
    Catagory?:string, 
    Model?:number, 
    MinMileage?:number, 
    MaxMileage?:number,
    Condition?:string,
    Year?:number,
    Price?:number,
    MinPrice?:number,
    MaxPrice?:number,
    Page?:number
  }

  export interface Result{
    success: boolean;
    result: any|undefined;
  }