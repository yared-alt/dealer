interface SerializedProduct {
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
  
  interface MongoProduct extends Omit<SerializedProduct, '_id' | 'createdAt' | 'updatedAt'> {
    _id: Object
    createdAt?: Date
    updatedAt?: Date
  }