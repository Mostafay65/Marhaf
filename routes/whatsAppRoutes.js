import express from "express";
import { initializeSession, sendMessage } from "../controllers/whatsAppController.js";

const router = express.Router();

// Initialize WhatsApp session (admin only)
router.post("/initialize", initializeSession);
router.post("/send-otp", sendMessage);

export default router;
