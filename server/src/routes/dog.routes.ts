import { Router } from "express";
import { GetDogsHandler, getDogById } from "../handlers/dogHandlers";
import data from "../../data";
import { Dog } from "../types/dog.types";

const dogRouter = Router();

dogRouter.get('/dogs', GetDogsHandler);

dogRouter.get('/dog/:id', getDogById)



export default dogRouter;