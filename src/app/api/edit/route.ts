import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import Car from "@/lib/model/carModel";
import { connect } from "@/lib/config/dbconfig";
import getsingelCar from "@/lib/utils/shared-api/getsingleCar";
import { CloudinaryResult, Result } from "@/type/Car";
import { deletImage } from "./deletImage";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


function stringToBoolean(str): boolean {
  if (typeof str === "boolean") return str;
  if (typeof str !== "string") return false;
  return str.toLowerCase() === "true";
}

export async function POST(request: Request) {
  const { success, message } = await connect();
  if (!success) {
    return NextResponse.json({ error: message }, { status: 400 })
  }
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") as string
    const { success, message, singlecar } = await getsingelCar(id)

    if (!success) {
      return NextResponse.json({ success: false, message: message }, { status: 404 });
    }
    const formdata = await request.formData();

    const FrontImagefile = formdata.get("frontImage") as File | string;
    var supportImages = formdata.getAll("otherImages") as File[] | string[];
    const brandname = formdata.get("brandname") as string;
    const carname = formdata.get("carname") as string;
    const catagory = formdata.get("catagory") as string;
    const price = formdata.get("price");
    const description = formdata.get("description");
    const color = formdata.get("color") as string;
    const size = formdata.get("size") as string;
    const model = formdata.get("model") as string;
    const discountedamount = formdata.get("discount") as string;
    const subcatagory = formdata.get("subcatagory") as string;
    const warranty = formdata.get("warranty") as string;
    const fueltype = formdata.get("fuel") as string;
    const milegone = formdata.get("milegone") as string;
    const condition = formdata.get("condition");
    const transmission = formdata.get("transmission");
    const silinder = formdata.get("silinder");
    const year = formdata.get("year");
    const isNew = formdata.get("isnew");
    const IsPopular = formdata.get("isPopular");
    const Instock = formdata.get("Instock");
    var FrontimagePublic_id;
    var OtherimagesPublic_id: string[] = [];

    // console.log(brandname,price,description,isNew,IsPopular,color,size,FrontImagefile,supportImages,catagory,Instock)

    if (!FrontImagefile || !brandname || !catagory || !price || !description || !color || !size) {
      console.log("Incommplete data")
      // return NextResponse.json({ error: "incomplete data" }, { status: 400 })
    }

    const front = (typeof FrontImagefile !== "string")
    const indexs = []
    for (var i = 0; i <= supportImages.length; i++) {
      if (typeof supportImages[i] !== "string") {
        indexs.push(i)
      }
    }

    if (!front && indexs.length === 0) {
      return;
    } else {
      const data = await deletImage({ id, front, indexs })
      if (data.seccess == false) {
        return NextResponse.json({ message: data.message }, { status: 500 });
      }
      // for front image upload
      if (front) {
        const byte = await FrontImagefile.arrayBuffer();
        const buffer = Buffer.from(byte);
  
        const uploadresult = await new Promise<CloudinaryResult>(
          (resolve, rejects) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "car-folder",
                transformation: [
                  { width: 800, height: 600, crop: "limit" },
                  { quality: "auto" }
                ]
              },
              (error, result) => {
                if (error) rejects(error);
                else resolve(result as CloudinaryResult);
              }
            );
            uploadStream.end(buffer)
          }
        )
        // console.log(uploadresult)
        FrontimagePublic_id = uploadresult.public_id;
      }

    }

    for (const e of supportImages) {
      if (typeof e !== "string") {
        const byte = await e.arrayBuffer();
        const buffer = Buffer.from(byte);

        const uploadresult = await new Promise<CloudinaryResult>(
          (resolve, rejects) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "car-folder",
                transformation: [
                  { width: 800, height: 600, crop: "limit" },
                  { quality: "auto" }
                ]
              },
              (error, result) => {
                if (error) rejects(error);
                else resolve(result as CloudinaryResult);
              }
            );
            uploadStream.end(buffer)
          }
        )
        // console.log(uploadresult)
        FrontimagePublic_id = uploadresult.public_id;

      }
    }
    // replace the slash in public_id with A so car-folder/ will be car-folderA
    const replaceSlash = (x: any) => {
      if (Array.isArray(x)) {
        var replacedString_id: string[] = [];
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
    const product = {
      CarBrand: brandname,
      CarName: carname,
      FrontImage: frontPic.toString(),
      SupportImages: otherPic.toString(),
      Catagory: catagory,
      SubCatagory: subcatagory,
      WarrantyGiven: warranty,
      Model: model,
      MileGone: Number(milegone),
      Description: description,
      Price: Number(price),
      Color: color,
      Condition: condition,
      Silinder: Number(silinder),
      Year: year,
      Transmission: transmission,
      DiscountedAmount: Number(discountedamount),
      FuelType: fueltype,
      Size: size,
      IsNew: stringToBoolean(isNew),
      IsPopular: stringToBoolean(IsPopular),
      InStock: stringToBoolean(Instock),
    }
    const update=await Car.findByIdAndUpdate(id,{product})
    // ypu will yous findAndUpdate
    // await product.save();
    console.log(update)
    // return NextResponse.json({success:true, message: "" }, { status: 500 });
  }catch(err){
    console.log(err)
    return NextResponse.json({success:false, message: "server error occured" }, { status: 500 });
  }
}

