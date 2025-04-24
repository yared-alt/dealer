import Car from "@/lib/model/carModel";
import { NextResponse } from "next/server";
import { connect } from "@/lib/config/dbconfig";
import type { Car as DashboardCar } from "@/app/dashboard/page";



interface Filter{
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

export async function GET(req:Request) {
  try {
      const response=await connect()
      if (!response.success) {
        console.log("response error object",response.error)
      }
      
      console.log("iiii")
        const {searchParams} = new URL(req.url)
        const color=searchParams.get("color") 
        const category=searchParams.get("category") 
        const model=searchParams.get("model") 
        const condition=searchParams.get("condition")
        const year=searchParams.get("year");
        const page=Number(searchParams.get("page")) || 1;
        const limit=Number(searchParams.get("limit")) || 10; 
        const skip=(page - 1) * limit;


      const filter :Filter={}

      color ? console.log("color",true):console.log("color",false)
      category ? console.log("category",true):console.log("category",false)
      condition ? console.log("condition",true):console.log("condition",false)
      year ? console.log("year",true):console.log("year",false)

      
      if (color) filter.Color = color.toString().toLowerCase();
      if (category) filter.Catagory = category.toString();
      if (model) filter.Model = Number(model);
      if (condition) filter.Condition = condition.toString();
      if (year) filter.Year = Number(year);

      console.log("filter",filter)
    const [cars, totalcount] :[cars:DashboardCar[],totalcount:number]= await Promise.all([
        Car.find(filter).skip(skip).limit(limit),
        Car.countDocuments(filter)
      ]);
      // const queryRes = await Car.findOne({ CarName: "toyota 20ultra" });
      // console.log("response   ",queryRes)
      if (totalcount == 0) {
        // return NextResponse.json({ success: false, message: "Cars are not found" }, { status: 404 });
      }

      // construct image file
      cars.forEach(car => {
        // Update FrontImage (with null check)
        if (car.FrontImage) {
          car.FrontImage = car.FrontImage.replace("car-folderA", "car-folder/");
        }
      
        // Update SupportImages array (with null/undefined check)
        if (car.SupportImages) {
          car.SupportImages = car.SupportImages.map(img => 
            img ? img.replace("car-folderA", "car-folder/") : img
          );
        }
      });
      
      const totalPages = Math.ceil(totalcount / limit);

      console.log("cars",cars)
      console.log("totalcount",totalcount)
      const generatePageUrl = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        return `${req.url?.split('?')[0]}?${params.toString()}`;;
      };
      

      return NextResponse.json({
        success: true,
        data: cars,
        pagination: {
          page,
          limit,
          totalcount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
          nextPage: page < totalPages ? generatePageUrl(page + 1) : null,
          prevPage: page > 1 ? generatePageUrl(page - 1) : null,
        }
      });
    } catch (error) {
        const response=NextResponse.json({Error:"error occured"},{status:500})
        return response
    }
  };