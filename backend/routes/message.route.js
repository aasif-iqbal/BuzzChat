import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:id", authMiddleware, sendMessage);

export default router;


