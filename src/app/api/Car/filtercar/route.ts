import { NextApiRequest } from "next";
import Car from "@/lib/model/carModel";
import { NextResponse } from "next/server";



interface Filter{
        color?:string, 
        category?:string, 
        model?:number, 
        minMileage?:number, 
        maxMileage?:number,
        condition?:string,
        year?:number,
        price?:number,
        minPrice?:number,
        maxPrice?:number,
        page?:number
}

export default async function GET(req:Request) {
    try {
    
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
      
      if (color) filter.color = color.toString().toLowerCase();
      if (category) filter.category = category.toString();
      if (model) filter.model = Number(model);
      if (condition) filter.condition = condition.toString();
      if (year) filter.year = Number(year);
      if (page) filter.page = Number(page);

    const [cars, totalcount] = await Promise.all([
        Car.find(filter).skip(skip).limit(limit),
        Car.countDocuments(filter)
      ]);
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