import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// check is sender and reciever is present and database
// and add sender cookie to request object as (req.user = user)  so that all other can get sender data from req obj

const protectRoute = async (req, res, next) => {
  try {
    // checking if sender is valid
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "user unAuthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "user unauthorized" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // checking if receiver is valid
    const receiverId = req.params.id;
    console.log(receiverId);
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(400).json({ error: "receiver not found " });
    }

    req.user = user; // adds sender data to req object

    next();
  } catch (error) {
    console.log("error in protected middleware", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export default protectRoute;
