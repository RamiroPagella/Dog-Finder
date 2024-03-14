import { Router } from "express";
import { GetDogsHandler, createDog, getDogById, getTempsAndBreedGroups, likeDog } from "../handlers/dogHandlers";
import { verifyToken } from "../middlewares/verifyToken";
import multer from "multer";


const dogRouter = Router();

dogRouter.get('/dogs', GetDogsHandler);

const storage = multer.memoryStorage();
const upload = multer({ storage })

dogRouter.post('/dog', verifyToken, upload.single('img'), createDog)

dogRouter.get('/dog/:id', getDogById)

dogRouter.get('/temps-and-breedgroups', getTempsAndBreedGroups);

dogRouter.post('/like', verifyToken, likeDog);


export default dogRouter;