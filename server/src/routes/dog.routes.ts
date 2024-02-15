import { Router } from "express";
import { GetDogsHandler, getDogById } from "../handlers/dogHandlers";
import data from "../../data";
import { Dog } from "../types/dog.types";
import DogModel from "../models/Dog.model";

const dogRouter = Router();

dogRouter.get('/dogs', GetDogsHandler);

dogRouter.get('/dog/:id', getDogById)

dogRouter.get('/averga', async (req, res) => {
  
})

export default dogRouter;