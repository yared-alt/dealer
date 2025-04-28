import mongoose from "mongoose";

interface ConnectionResult {
  success: boolean;
  message: string;
}

export async function connect(): Promise<ConnectionResult> {
  try {
    mongoose.set('bufferTimeoutMS', 50000);
    const connectionPromise = mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    
    connection.on("connected", () => {
      console.log("DB connected successfully");
    });

    connection.on("error", (err) => {
      return { 
        success: false, 
        message: "MongoDB connection error" 
      };
    });
    await connectionPromise;
    return { success: true ,message:'conected seccessfuly'};

  } catch (err) {
    console.log(err)
    return { 
      success: false, 
      message: "Failed to connect to database" 
    };
  }
}