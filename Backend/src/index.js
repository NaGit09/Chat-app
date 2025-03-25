import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookiesParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";
// config
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookiesParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
// listen port 5001 cd B
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING IN PORT ${PORT}`);
  connectDB();
});
