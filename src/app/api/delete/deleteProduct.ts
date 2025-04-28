import Car from "@/lib/model/carModel";

export const deleteProduct = async ( ids: string[] ) => {

  try {
    for (const id of ids) {
      await Car.findByIdAndDelete(id)
      //  console.log("deleting form db is success",result)
    }
    return { success: true, result: "succefully deleted product" };

  } catch (error) {
    return { success: false, result: "error occured on deleting product" };
  }
} 