import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import { getIO } from "../socket.js";

export const sendMessage = async (req, res) => {
    try {
        const io = getIO();
        const { receiverId, text } = req.body;

        let conversation = await Conversation.findOne({ members: { $all: [req.user.id, receiverId] } });

        if (!conversation) {
            conversation = await Conversation.create({ members: [req.user._id, receiverId] });
        }

        const message = await Message.create({
            sender: req.user._id,
            receiver: receiverId,
            text,
            conversationId: conversation._id
        });

        io.to(receiverId).emit(
            "receiveMessage",
            message
        )

        io.to(req.user._id.toString()).emit(
            "receiveMessage",
            message
        )

        res.status(201).json(message);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversationId });

        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({ members: req.user._id }).populate("members", "avatar name");

        res.status(200).json(conversations);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getConversation = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.userId;

        const conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });

        if (!conversation) {
            return res.status(200).json(null);
        }

        res.status(200).json(conversation);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}