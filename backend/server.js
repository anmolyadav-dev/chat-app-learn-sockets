import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
// import conversationRoutes from "./routes/conversation.route.js";
import messagesRoutes from "./routes/messages.route.js";
import connect from "./dbConfig/mongoDBconnect.js";
import protectRoute from "./middlewares/protectRoute.js";

// --------------------------------- code ---------------------------------------------
dotenv.config();
connect();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", protectRoute, messagesRoutes);
// app.use("/api/conversation", conversationRoutes);

// app.get("/", (req, res) => {
//   // route route = localhost:5000
//   res.send("hello world");
// });

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
