import { GETSINGLECAR } from "@/type/Car";
import { connect } from "@/lib/config/dbconfig";
import Car from "@/lib/model/carModel";

export default async function getsingelCar(id:string):Promise<GETSINGLECAR> {
    try {
        const response=await connect();
        if (!response.success) {
            console.log("connection failed")
        }

        const car=await Car.findById(id).exec();

        if(!car){
            return { success: false, message: "Car not found" };
        }

        const relatedCars = await Car.find({
            $and: [
              { _id: { $ne: car._id } }, 
              {
                $or: [
                  { category: car.Category },
                  { model: car.Model }, 
                  { 
                    price: { 
                      $gte: car.Price * 0.8,
                      $lte: car.Price * 1.2 
                    } 
                  },
                  { 
                    year: { 
                      $gte: car.Year - 2, 
                      $lte: car.Year + 2 
                    } 
                  }
                ]
              }
            ]
          })
          .limit(4) 
          .sort({ createdAt: -1 }) 
          .exec();

          return { success: true, singlecar:car, relatedcars:relatedCars}
    } catch (error) {
        return { success : false, message: "internal server error occccured"}
    }
}