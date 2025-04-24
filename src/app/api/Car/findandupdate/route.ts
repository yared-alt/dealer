import Car from "@/lib/model/carModel";
import { NextResponse } from "next/server";
import { connect } from "@/lib/config/dbconfig";
export default async function POST(req:Request) {
    try {
        connect()
        const {searchParams} = new URL(req.url)
        const data=req.body;
        const id=searchParams.get("id") as string;

        const update=await Car.findByIdAndUpdate(id,{data})

        const response=NextResponse.json({suscess:true},{status:200})
        return response
    } catch (error) {
        const response=NextResponse.json({Error:"error occured"},{status:500})
        return response
    }
}