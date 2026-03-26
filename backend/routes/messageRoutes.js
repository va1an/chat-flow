import express from "express";
import { sendMessage, getMessages, getConversations, getConversation } from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/conversations/all", protect, getConversations);
router.get("/conversation/:userId", protect, getConversation);
router.get("/:conversationId", protect, getMessages);

export default router;