import {  Router } from "express";
import { createConversation, deleteConversationById, findConversationById, findConversationsByUserId, sendMessage, textAIGeneration } from "../handlers/conversation";

const conversationRouter = Router();

conversationRouter.get("/test", async () => {
    await textAIGeneration();
});
conversationRouter.post("/create", async (req, res) => {
    await createConversation(req, res);
});
conversationRouter.get("/all/:userId", async (req, res) => {
    await findConversationsByUserId(req, res);
});
conversationRouter.delete("/:id", async (req, res) => {
    await deleteConversationById(req, res);
});
conversationRouter.get("/:id", async (req, res) => {
    await findConversationById(req, res);
});
conversationRouter.post("/send", async (req, res) => {
    await sendMessage(req, res);
});



export default conversationRouter;