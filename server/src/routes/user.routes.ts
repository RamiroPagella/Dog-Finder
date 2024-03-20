import { Router } from "express";
import { Register, Login, UserInfo } from "../handlers/userHandlers";
import { verifyToken } from "../middlewares";
import multer from "multer";

const userRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

userRouter.post("/register", Register);

userRouter.post("/login", Login);

userRouter.get("/user/info", verifyToken, UserInfo);

export default userRouter;
