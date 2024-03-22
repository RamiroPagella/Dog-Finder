import { Router } from "express";
import {
  GetDogs,
  approveOrDisapproveAll,
  approveOrDissaprove,
  cancelPendingDog,
  createDog,
  deleteDog,
  getDogById,
  getPendingDogById,
  getPendingDogs,
  getTempsAndBreedGroups,
  likeDog,
} from "../handlers/dogHandlers";
import { verifyToken } from "../middlewares";
import multer from "multer";
import data from "../../data";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const dogRouter = Router();

dogRouter.get("/dogs", GetDogs);

dogRouter.get("/dog/:id", getDogById);

dogRouter.post("/dog", verifyToken, upload.single("img"), createDog);

dogRouter.delete("/dog", verifyToken, deleteDog);

dogRouter.delete("/pending-dog", verifyToken, cancelPendingDog);

dogRouter.get("/dogs/pending", verifyToken, getPendingDogs);

dogRouter.put("/pending-dog", verifyToken, approveOrDissaprove);

dogRouter.put("/pending-dog/all", verifyToken, approveOrDisapproveAll);

dogRouter.get("/pending-dog/:id", verifyToken, getPendingDogById);

dogRouter.get("/temps-and-breedgroups", getTempsAndBreedGroups);

dogRouter.post("/like", verifyToken, likeDog);

export default dogRouter;
