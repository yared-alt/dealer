import { NextResponse } from "next/server";
import { Result } from "@/type/Car";
import { deleteImage } from "./deleteImage";
import { deleteProduct } from "./deleteProduct";

export async function DELETE(req:Request) {
    try {
        const {searchParams}=new URL(req.url)
        const ids=searchParams.get("ids")?.split(",")||[];
        if (!ids) {
            return NextResponse.json({success:false,message:"product not found"},{status:404});
        }
        console.log("idds",ids)
        const result:Result=await deleteImage(ids);

        if (result.success) {
          const d=await deleteProduct(ids)
          if(d.success){
            return NextResponse.json({success:true,message:"product deleted succesfully"},{status:200});
          }
          return NextResponse.json({success:false,message:"error occured while deleting from mongo"},{status:500});
        }

    } catch (error) {
        return NextResponse.json({success:false,message:"server error"},{status:500});
    }

}