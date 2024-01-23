import { Router } from "express";
import { GetAllDogs } from "../handlers/dogHandlers";

const dogRouter = Router();

dogRouter.get('/dogs', GetAllDogs);

export default dogRouter;