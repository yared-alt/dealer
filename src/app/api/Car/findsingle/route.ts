import Car from "@/lib/model/carModel";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default async function GET(req:Request) {

    try {
        const {searchParams} = new URL(req.url)
        const id= searchParams.get("id") as string; 
        const car=await Car.findById(id).exec();

        if(!car){
            return NextResponse.json({ success: false, message: "Car not found" }, { status: 404 });
        }
        // i may add related product fetch here if i want

        const relatedCars = await Car.find({
            $and: [
              { _id: { $ne: car._id } }, 
              {
                $or: [
                  { category: car.category },
                  { model: car.model }, 
                  { 
                    price: { 
                      $gte: car.price * 0.8,
                      $lte: car.price * 1.2 
                    } 
                  },
                  { 
                    year: { 
                      $gte: car.year - 2, 
                      $lte: car.year + 2 
                    } 
                  }
                ]
              }
            ]
          })
          .limit(4) 
          .sort({ createdAt: -1 }) 
          .exec();

        const response=NextResponse.json({suscess:true,data:{singelcar:car,relatedcars:relatedCars}},{status:200})
        return response
    } catch (error) {
        const response=NextResponse.json({Error:"error occured"},{status:500})
        return response
    }
}