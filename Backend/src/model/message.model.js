import mongoose, { Types } from 'mongoose'
// Create a message schema for the MongoDB database using Mongoose
// The schema defines the structure of the message document in the database
const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true 
    },
    receiverId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        require : true 
    },
    text : {
        type : String
    },
    image : {
            type : String
    }
},{timestamps:true})
// Create a Mongoose model for the message schema
// This model will be used to interact with the messages collection in the database
const Message = mongoose.model("Message" , messageSchema)
export default Message ; 