import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connect from "./dbConfig/mongoDBconnect.js";
dotenv.config();
connect();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   // route route = localhost:5000
//   res.send("hello world");
// });

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
