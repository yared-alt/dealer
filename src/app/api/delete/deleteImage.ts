import getsingelCar from "@/lib/utils/shared-api/getsingleCar";
import { Result } from "@/type/Car";
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
export const deleteImage = async(ids:string[]):Promise<Result|undefined>=>{

    for(const id of ids){

      const {singlecar}=await getsingelCar(id);
      const FrontImage=singlecar?.FrontImage
      var SupportImage=singlecar?.SupportImages

      if (FrontImage !== undefined) {
        SupportImage?.push(FrontImage)
      }
      if (SupportImage?.length !== undefined) {
        try {
          SupportImage = SupportImage.map(e => e.replace("car-folderA", "car-folder/"));
        //   console.log(SupportImage)

          const results = await Promise.all(
            SupportImage.map(publicId => cloudinary.uploader.destroy(publicId,{ invalidate: true }))
          );
          console.log("image deleted succesfully",results)
          return {success:true,result:results};
        } catch (error) {
          console.error('Error deleting images:', error);
          return {success:true,result:"error"};
        }
      }else{
        return {success:false, result:"images are undifiend"}
      }
    }
  }