import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provider" });
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode)
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found " });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
  }
};
