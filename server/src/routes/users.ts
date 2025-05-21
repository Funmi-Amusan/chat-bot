import { Router } from "express";
import { createUser, fetchUser, login } from "../handlers/users";

const userRouter = Router();

userRouter.post("/create-user", async (req, res) => {
    await createUser(req, res);
});
userRouter.post("/login", async (req, res) => {
    await login(req, res);
});
userRouter.post("/fetch-user", async (req, res) => {
    await fetchUser(req, res);
});

export default userRouter;