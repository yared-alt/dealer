import getsingelCar from "@/lib/utils/shared-api/getsingleCar";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
  

export const deletImage=async({id,front,indexs}:{id:string,front:boolean,indexs:number[]})=>{

    try {
        const resultOnDeleteImage:any = []
        
        const d = await getsingelCar(id);
        const ImageTobeDelete:string[] = []
        if (front) {
          ImageTobeDelete.push(d.singlecar?.FrontImage.replace("car-FolderA", "car-Folder/") || "")
        }
        if (indexs.length > 0) {
          for (const value of indexs) {
            ImageTobeDelete.push(d.singlecar?.SupportImages[value].replace("car-FolderA", "car-Folder/") || "")
          }
    
        //   ask what if i dont return
        }
        if ((ImageTobeDelete.length > 0) && (ImageTobeDelete !== undefined)) {
          for (const publicId of ImageTobeDelete) {
            if (publicId) {
              const result = await cloudinary.uploader.destroy(publicId, { invalidate: true })
              return resultOnDeleteImage.push(result)
            }
          }
        }

        return {resultOnDeleteImage}
    } catch (error) {
        console.log(error)
        return {success:false,message:"error on deleting"}
    }
}