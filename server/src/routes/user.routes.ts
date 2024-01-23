import { Router } from "express";
import { Register, Login, UserInfo } from "../handlers/userHandlers";
import { verifyToken } from "../middlewares/verifyToken";


const userRouter = Router();


userRouter.post('/register', Register);

userRouter.post('/login', Login)

userRouter.get('/user/info', verifyToken, UserInfo);




export default userRouter;
