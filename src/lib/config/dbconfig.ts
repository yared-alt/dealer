import mongoose from "mongoose";

export async function connect() {

    try {
        mongoose.set('bufferTimeoutMS', 50000);
        mongoose.connect(process.env.MONGODB_URI!)
 
        const connection=mongoose.connection;
        connection.on("connected",()=>{
            console.log("db connected succefuly")
        });
        connection.on("error",(err)=>{
            console.log("error on connecting db", err)
        })
    } catch (err) {
        console.log(err)
    }
}