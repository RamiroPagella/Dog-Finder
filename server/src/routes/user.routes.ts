import { Router } from "express";
import { Register, Login, UserInfo } from "../handlers/userHandlers";
import { verifyToken } from "../middlewares/verifyToken";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const userRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

userRouter.post("/register", Register);

userRouter.post("/login", Login);

userRouter.get("/user/info", verifyToken, UserInfo);

userRouter.post("/aver", upload.single("image"), async (req, res) => {
  req.file && console.log(req.file)
});

export default userRouter;
