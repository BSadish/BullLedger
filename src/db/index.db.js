
import mongoose from "mongoose";


const connectDB=async()=>{
 
     const connectionInstance=   await mongoose.connect(process.env.MONGODB_URL);
     console.log(`Mongodb Connected: ${connectionInstance.connection.host}`);
    };

export default connectDB;
