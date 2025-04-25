import { NextResponse } from "next/server";



export default async function DELETE(req:Request) {
    try {
        
        const {searchParams}=new URL(req.url)
        const id=searchParams.get("id");
        if (!id) {
            return NextResponse.json({success:false,message:"product not found"},{status:404});
        }
 

        // delete logic here

        return NextResponse.json({success:true,message:"product deleted succesfully"},{status:200});

    } catch (error) {
        return NextResponse.json({success:false,message:"server error"},{status:500});
    }
}