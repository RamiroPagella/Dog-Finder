import { Router } from "express";
import { GetDogs, getDogById } from "../handlers/dogHandlers";
import data from "../../data";
import { Dog } from "../types/dog.types";

const dogRouter = Router();

dogRouter.get('/dogs', GetDogs);

dogRouter.get('/dogs/:id', getDogById)



export default dogRouter;