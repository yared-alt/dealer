import type { SerializedProduct, MongoProduct } from "@/type/Car.d.ts"

export function serializeCar(cars: MongoProduct | any): SerializedProduct {
  const rawProduct = cars.toObject ? cars.toObject() : cars

  return {
            _id: rawProduct._id?.toString() || '',
            id: rawProduct.id,
            CarName: rawProduct.CarName,
            CarBrand: rawProduct.CarBrand,
            FrontImage: rawProduct.FrontImage,
            SupportImages: rawProduct.SupportImages || [],
            MileGone: rawProduct.MileGone,
            Model: rawProduct.Model,
            WarrantyGiven: rawProduct.WarrantyGiven,
            Catagory: rawProduct.Catagory,
            SubCategory: rawProduct.SubCatagory,
            DiscountedAmount: rawProduct.DiscountedAmount || 0,
            Condition: rawProduct.Condition,
            Transmission: rawProduct.Transmission,
            Silinder: rawProduct.Silinder,
            Year: rawProduct.Year,
            Description: rawProduct.Description,
            FuelType:rawProduct.FuelType,
            Price: rawProduct.Price,
            Color: rawProduct.Color,
            Size: rawProduct.Size,
            IsNew: rawProduct.IsNew || false,
            Review: rawProduct.Review || 0,
            IsPopular: rawProduct.IsPopular || false,
            InStock: rawProduct.InStock || false,
            createdAt: rawProduct.createdAt?.toISOString(),
            updatedAt: rawProduct.updatedAt?.toISOString()
  }
}

export function serializeProductList(products: MongoProduct[]): SerializedProduct[] {
  return products.map(serializeCar)
}