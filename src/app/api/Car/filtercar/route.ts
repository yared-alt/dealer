import Car from "@/lib/model/carModel";
import { NextResponse } from "next/server";
import { connect } from "@/lib/config/dbconfig";
import type { Car as car, Filter } from "@/type/Car";
import buildImage from "@/helper/methods/buidImage";


export async function GET(req:Request) {
  try {
      const response=await connect()
      if (!response.success) {
        console.log("response connection error object",response.error)
        return NextResponse.json({success:false,message:"connection faild on mongo"},{status:500})
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

      // color ? console.log("color",true):console.log("color",false)
      // category ? console.log("category",true):console.log("category",false)
      // condition ? console.log("condition",true):console.log("condition",false)
      // year ? console.log("year",true):console.log("year",false)

      
      if (color) filter.Color = color.toString().toLowerCase();
      if (category) filter.Catagory = category.toString();
      if (model) filter.Model = Number(model);
      if (condition) filter.Condition = condition.toString();
      if (year) filter.Year = Number(year);

      // console.log("filter",filter)
    const [cars, totalcount] :[cars:car[],totalcount:number]= await Promise.all([
        Car.find(filter).skip(skip).limit(limit),
        Car.countDocuments(filter)
      ]);
      // const queryRes = await Car.findOne({ CarName: "toyota 20ultra" });
      // console.log("response   ",queryRes)
      if (totalcount == 0) {
        // return NextResponse.json({ success: false, message: "Cars are not found" }, { status: 404 });
      }

      // construct image file
      const r=buildImage(cars)
      
      const totalPages = Math.ceil(totalcount / limit);

      // console.log("cars",cars)
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