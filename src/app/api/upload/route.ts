import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import Car from "@/lib/model/carModel";
import { connect } from "@/lib/config/dbconfig";
import pTimeout from "p-timeout";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

interface CloudinaryResult {
  public_id: string,
  [key: string]: any,
}

function stringToBoolean(str) {
  if (typeof str === "boolean") return str;
  if (typeof str !== "string") return false;
  return str.toLowerCase() === "true";
}

export async function POST(request: NextRequest) {

  try {
  
    const response=await connect()
    if (!response.success) {
      console.log("response error object",response.message)
      return NextResponse.json({ error: "error ocured on uploding image" }, { status: 500 });

    }
    
    const formdata = await request.formData();

    const FrontImagefile = formdata.get("frontImage") as File;
    const supportImages = formdata.getAll("otherImages") as File[];
    const brandname = formdata.get("brandname") as string;
    const carname = formdata.get("carname") as string;
    const catagory = formdata.get("catagory") as string;
    const price = formdata.get("price");
    const description = formdata.get("description");
    const color = formdata.get("color") as string;
    const size = formdata.get("size") as string;
    const model =formdata.get("model") as string;
    const discountedamount=formdata.get("discount") as string;
    const subcatagory= formdata.get("subcatagory") as string;
    const warranty=formdata.get("warranty") as string;
    const fueltype= formdata.get("fuel") as string;
    const milegone=formdata.get("milegone") as string;
    const condition=formdata.get("condition");
    const transmission=formdata.get("transmission");
    const silinder=formdata.get("silinder");
    const year=formdata.get("year");
    const isNew = formdata.get("isnew");
    const IsPopular = formdata.get("isPopular");
    const Instock = formdata.get("Instock");
    var FrontimagePublic_id;
    var OtherimagesPublic_id:string[] = [];

    // console.log(brandname,price,description,isNew,IsPopular,color,size,FrontImagefile,supportImages,catagory,Instock)

    if (!FrontImagefile || !brandname || !catagory || !price || !description || color || !size) {
      console.log("Incommplete data")
      // return NextResponse.json({ error: "incomplete data" }, { status: 400 })
    }
    try {
      const byte = await FrontImagefile.arrayBuffer();
      const buffer = Buffer.from(byte);

      const frontresult = await pTimeout(
        new Promise<CloudinaryResult>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "car-folder",
              transformation: [
                { width: 800, height: 600, crop: "limit" },
                { quality: "auto" }
              ]
            },
            (error, result) => {
              if (error) {
                console.log("Upload error:", error);
                reject(error);
              } else {
                resolve(result as CloudinaryResult);
              }
            }
          );
          uploadStream.end(buffer);
        }),
        {
          milliseconds: 60000,  // Timeout after 60s
          message: "Cloudinary upload timed out after 60 seconds"
        }
      );
      // console.log(frontresult)
      FrontimagePublic_id = frontresult.public_id;
      console.log(FrontimagePublic_id, "fffffffffffffffffffff")
    } catch (error) {
      console.error("Error reading file:", error);
      return NextResponse.json({ error: "error ocured on uploding image" }, { status: 500 });
    }
    // additinal image s upload
    // return;
    try {
      const supportImagesResults = await Promise.all(
        supportImages.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return new Promise<CloudinaryResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "car-folder" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as CloudinaryResult);
              }
            );
            uploadStream.end(buffer);
          });
        })
      );
      supportImagesResults.map((each) => {
        OtherimagesPublic_id.push(each.public_id)
      })
    } catch (error) {
      return NextResponse.json({ error: "error ocured on uploading support images" }, { status: 500 })
    }
    // replace the slash in public_id with A so car-folder/ will be car-folderA
    const replaceSlash = (x: any) => {
      if (Array.isArray(x)) {
        var replacedString_id:string[] = [];
        x.forEach((el) => {
          replacedString_id.push(el.replace("car-folder/", "car-folderA"));
        })
        return replacedString_id;
      } else {
        return x.replace("car-folder/", "car-folderA")
      }
    }
    const frontPic = replaceSlash(FrontimagePublic_id);
    const otherPic = replaceSlash(OtherimagesPublic_id);
    // return;
    try {
      const product = new Car({
        CarBrand: brandname,
        CarName:carname,
        FrontImage:frontPic.toString(),
        SupportImages: otherPic.toString(),
        Catagory: catagory,
        SubCatagory:subcatagory,
        WarrantyGiven:warranty,
        Model:model,
        MileGone:Number(milegone),
        Description: description,
        Price: Number(price),
        Color: color,
        Condition:condition,
        Silinder:Number(silinder),
        Year:year,
        Transmission:transmission,
        DiscountedAmount:Number(discountedamount),
        FuelType:fueltype,
        Size:size,
        IsNew:stringToBoolean(isNew),
        IsPopular:stringToBoolean(IsPopular),
        InStock: stringToBoolean(Instock),
      })
      await product.save();
      return NextResponse.json({ message: "Car is registered sucsessfuly" }, { status: 200 })
    } catch (error) {
      console.log("errorrroror",error)
      return NextResponse.json({error:"error ocured ooon uploading saving other images"},{status:500})
    }
  } catch (error) {
    console.log("upload faild", error);
    return NextResponse.json({ error: "faild on server" }, { status: 500 })
  }
}

