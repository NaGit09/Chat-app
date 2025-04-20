import mongoose from 'mongoose'
//  connects to the MongoDB database using Mongoose
export const connectDB  = async () => {
    try {
       const connect =  await mongoose.connect(process.env.MONGODB_URI)
   console.log(connect.connection.host);
   
    } catch (error) {
        console.log(error);
        
    }
}