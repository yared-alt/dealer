import { Car } from "@/type/Car";


export default function buildImage(car:Car|Car[]) {
    if (Array.isArray(car)) {
        car.forEach(c => {
            if (c.FrontImage) {
              c.FrontImage = c.FrontImage.replace("car-folderA", "car-folder/");
            }
            if (c.SupportImages) {
              c.SupportImages = c.SupportImages.map(img => 
                img ? img.replace("car-folderA", "car-folder/") : img
              );
            }
          });

          return{car};
    }else{
        if (car.FrontImage) {
            car.FrontImage = car.FrontImage.replace("car-folderA", "car-folder/");
          }
          if (car.SupportImages) {
            car.SupportImages = car.SupportImages.map(img => 
              img ? img.replace("car-folderA", "car-folder/") : img
            );
          }
          return{car};
    }
}