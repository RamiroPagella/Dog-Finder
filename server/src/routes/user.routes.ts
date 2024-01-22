import { Router } from "express";
import { Register, Login, UserInfo } from "../handlers/userHandlers";
import { verifyToken } from "../middlewares/verifyToken";


const router = Router();


router.post('/register', Register);

router.post('/login', Login)

router.get('/user', verifyToken, UserInfo);




export default router;
