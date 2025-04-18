import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/UserModel.js";

const app = express();
const server = http.createServer(app);
const frontendUrl = "http://localhost:5173";
const io = new Server(server, {
  cors: {
    origin: [frontendUrl],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const activeUsers = new Map();
function getReceiverSocketId(userId) {
  return activeUsers.get(userId);
}
const name = "test";
io.on("connection", (socket) => {
  console.log("user connected with socketId " + socket.id);
  socket.on("userOnline", async (userId) => {
    activeUsers.set(userId, socket.id);

    await User.findByIdAndUpdate(userId, {
      isOnline: true,
    });

    io.emit("updateUsers", Array.from(activeUsers.keys()));
  });
  socket.on("joinRoom", (conversationId) => {
    socket.join(conversationId);
  });
  socket.on("typing", ({ senderId, conversationId }) => {
    io.to(conversationId).emit("userTyping", { senderId });
  });

  socket.on("stopTyping", ({ senderId, conversationId }) => {
    io.to(conversationId).emit("userStoppedTyping", { senderId });
  });
  socket.on("disconnect", async () => {
    const userId = [...activeUsers.entries()].find(
      ([key, value]) => value === socket.id
    )?.[0];

    if (userId) {
      activeUsers.delete(userId);
      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date(),
      });

      io.emit("updateUsers", Array.from(activeUsers.keys()));
    }

    console.log("a user disconnected", socket.id);
  });
});

export { io, app, server, getReceiverSocketId };
