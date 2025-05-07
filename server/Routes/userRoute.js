import express from "express";
import {createUser, login, forgotPassword, resetPassword} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.post("/login", login);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

export default userRouter;
