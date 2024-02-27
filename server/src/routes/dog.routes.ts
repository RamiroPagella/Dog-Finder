import { Router } from "express";
import { GetDogsHandler, getDogById, getTempsAndBreedGroups, likeDog } from "../handlers/dogHandlers";
import { verifyToken } from "../middlewares/verifyToken";


const dogRouter = Router();

dogRouter.get('/dogs', GetDogsHandler);

dogRouter.get('/dog/:id', getDogById)

dogRouter.get('/temps-and-breedgroups', getTempsAndBreedGroups);

dogRouter.post('/like', verifyToken, likeDog);


export default dogRouter;