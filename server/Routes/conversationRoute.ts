import express from "express";
import {
    createConversation,
    findConversationsByUserId,
    deleteConversationById,
    findConversationById,
    sendMessage,
} from "../Controllers/conversationController.js";

const conversationRouter = express.Router();

conversationRouter.post("/create", createConversation);
conversationRouter.get("/all/:userId", findConversationsByUserId);
conversationRouter.delete("/:id", deleteConversationById);
conversationRouter.get("/:id", findConversationById);
conversationRouter.post("/send", sendMessage);

export default conversationRouter;
