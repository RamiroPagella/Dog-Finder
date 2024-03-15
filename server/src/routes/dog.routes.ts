import { Router } from "express";
import {
  GetDogsHandler,
  approveOrDissaproveDog,
  createDog,
  getDogById,
  getPendingDogById,
  getPendingDogs,
  getTempsAndBreedGroups,
  likeDog,
} from "../handlers/dogHandlers";
import { verifyToken } from "../middlewares/verifyToken";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const dogRouter = Router();

dogRouter.get("/dogs", GetDogsHandler);

dogRouter.get("/dogs/pending", getPendingDogs);

dogRouter.get("/dog/:id", getDogById);

dogRouter.post("/dog", verifyToken, upload.single("img"), createDog);

dogRouter.get('/dog/pending/:id', verifyToken, getPendingDogById);

dogRouter.put('/dog/pending/:id', verifyToken, approveOrDissaproveDog);

dogRouter.get("/temps-and-breedgroups", getTempsAndBreedGroups);

dogRouter.post("/like", verifyToken, likeDog);

export default dogRouter;
