import express from "express";
import http from "http";
import { Server } from "socket.io";
// create socket server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
// check user online or offline
const userSocketMap = {};
export const getReceiverSocketId =  (userId) => {
  return userSocketMap[userId];
} 
// handle socket connection and disconnection
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { io, server, app };
