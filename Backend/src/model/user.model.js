import mongoose from "mongoose";
// Create a user schema for the MongoDB database using Mongoose
// The schema defines the structure of the user document in the database
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
// Create a Mongoose model for the user schema
// This model will be used to interact with the users collection in the database
const User = mongoose.model("User" , userSchema);
export default User;