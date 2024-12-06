import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/messages.route.js";
import userRoutes from "./routes/user.route.js";
import connect from "./dbConfig/mongoDBconnect.js";
import { app, server } from "./socket/socket.js";
// --------------------------------- code ---------------------------------------------

const __dirname = path.resolve();

dotenv.config();
connect();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
