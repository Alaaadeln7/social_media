import { io } from "socket.io-client";
import { setOnlineUsers } from "../app/userSlice";

export let socket = null;
const backend_url =
  import.meta.env.MODE === "development"
    ? "http://localhost:9090/"
    : "/";
export const socketConnection = (dispatch, authUser) => {
  if (socket?.connected) return;

  socket = io(backend_url, {
    withCredentials: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.connect();

  // Make socket globally available for RTK Query
  window.socket = socket;

  // Connection events
  socket.on("connect", () => {
    console.log("Socket connected " + socket.id);
    socket.emit("userOnline", authUser?._id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  // User status events
  socket.on("updateUsers", (userIds) => {
    dispatch(setOnlineUsers(userIds));
  });

  return socket;
};

export const socketDisconnection = () => {
  if (socket?.connected) {
    socket.disconnect();
    window.socket = null;
    socket = null;
    console.log("Socket disconnected");
  }
};

export const emitTyping = (data) => {
  if (!socket?.connected) return;

  socket.emit("typing", data);
};

export const subscribeToTyping = (callback) => {
  if (!socket?.connected) return;

  socket.on("userTyping", callback);
  return () => socket.off("userTyping", callback);
};

export const unsubscribeFromTyping = () => {
  if (!socket?.connected) return;

  socket.off("userTyping");
};

