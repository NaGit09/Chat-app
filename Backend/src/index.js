import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookiesParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";
import {io ,server , app } from './lib/socket.js'
// config
dotenv.config();

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
app.use("/api/messages", messageRoutes);
// listen port 5001 cd B
server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING IN PORT ${PORT}`);
  connectDB();
});
