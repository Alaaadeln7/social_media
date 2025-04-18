import express from "express";
import session from "express-session";
import { config } from "dotenv";
import { connectionDB } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import friendsRoutes from "./routes/friendsRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import commentsRoutes from "./routes/commentRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js"
import cors from "cors";
import morgan from "morgan";
import CookiesParser from "cookie-parser";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { app, server } from "./config/socket.js";
import path from "path";
const __dirname = path.resolve();
const port = process.env.PORT || 5000;
const frontend =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:5173";
app.use(
  express.json({
    limit: "10mb",
  })
);
config();
connectionDB();
app.use(CookiesParser());
app.use(
  cors({
    origin: frontend,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET_KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(xss());
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// start of routes
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comment", commentsRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/events", eventsRoutes)
// end of routes


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
