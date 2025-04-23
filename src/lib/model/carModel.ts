import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    FrontImage: { type: String, required: [true, "image is not stated"] },
    SupportImages: { type: [String], },
    CarName: { type: String, required: [true, "car name is not stated"] },
    CarBrand: { type: String, required: [true, "car brand name is not stated"] },
    Model: { type: String, required: [true, "car model is not stated"] },
    MileGone: { type: Number, default: 0 },
    Catagory: { type: String, required: [true, "category is not stated"] },
    SubCatagory: { type: String, required: [true, "Subcategory is not stated"] },
    WarrantyGiven: { type: String },
    Description: { type: String, required: [true, "description is not stated"] },
    Price: { type: Number, required: [true, "price is not stated"] },
    DiscountedAmount: { type: Number },
    Condition: { type: String },
    Transmission: { type: String, required: [true] },
    Silinder:{type: Number,required:[true,"slilinder is required"]},
    Year:{type: Number,required:[true,"year is required"]},
    Size: { type: String },
    Color: { type: String },
    FuelType: { type: String },
    IsNew: { type: Boolean, default: true },
    Review: { type: Number, default:3 },
    IsPopular: { type: Boolean, default: false },
    InStock: { type: Boolean, default: true }
});

 const Car = mongoose.models.Car || mongoose.model("Car", CarSchema);

 export default Car;