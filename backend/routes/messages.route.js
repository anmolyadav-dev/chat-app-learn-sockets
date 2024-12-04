import express from "express";
import { sendMessage } from "../controllers/messages.controller.js";
const router = express.Router();

router.post("/send/:id", sendMessage);

export default router;
