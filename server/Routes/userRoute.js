import express from "express";
import {createUser, login, forgotPassword, resetPassword, fetchUser} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.post("/login", login);
userRouter.post("/fetch-user", fetchUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

export default userRouter;
