import { NextResponse } from "next/server";
import getsingelCar from "@/lib/utils/shared-api/getsingleCar";
import { GETSINGLECAR } from "../../edit/route";

export default async function GET(req:Request) {

    try {
        const {searchParams} = new URL(req.url)
        const id= searchParams.get("id") as string; 

        const {success,message,singlecar,relatedcars}=await getsingelCar(id)
        if (!success) {
          return NextResponse.json({ success: false, message: message}, { status: 404 });
        }
        const car=singlecar;
        const relatedCars=relatedcars;
        const response=NextResponse.json({suscess:true,data:{singelcar:car,relatedcars:relatedCars}},{status:200})
        return response
    } catch (error) {
        const response=NextResponse.json({Error:"error occured"},{status:500})
        return response
    }
}