import Car from "@/lib/model/carModel";
import { Result } from "@/type/Car";


export const deleteProduct=async({ids,result}:{ids:string[],result:Result})=>{

    try {
      if (result?.success === false) {
        console.log("error on deleting")  
        return {success:false,result:"error occured on deleting image"};
      } 
          for(const id of ids){
           await Car.findByIdAndDelete(id)
          //  console.log("deleting form db is success",result)
          }
      return {success:true,result:"succefully deleted product"};
        
    } catch (error) {
      return {success:false,result:"error occured on deleting product"};
    }
  } 