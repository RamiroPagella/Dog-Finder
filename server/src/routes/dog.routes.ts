import { Router } from "express";
import { GetDogs } from "../handlers/dogHandlers";
import data from "../../data";

const dogRouter = Router();

dogRouter.get('/dogs', GetDogs);

dogRouter.get('/perros', (req, res) => {
  try {
    res.json(data);
  } catch (error) {
    console.log(error)
  }
})

export default dogRouter;