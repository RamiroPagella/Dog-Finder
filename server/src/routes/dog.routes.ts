import { Router } from "express";
import {
  GetDogs,
  approveOrDisapproveAll,
  approveOrDissaprove,
  createDog,
  getDogById,
  getPendingDogById,
  getPendingDogs,
  getTempsAndBreedGroups,
  likeDog,
} from "../handlers/dogHandlers";
import { verifyToken } from "../middlewares/verifyToken";
import multer from "multer";
import data from "../../data";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const dogRouter = Router();

dogRouter.get("/dogs", GetDogs);

dogRouter.get("/dogs/pending", getPendingDogs);

dogRouter.post("/dog", verifyToken, upload.single("img"), createDog);

dogRouter.put("/dog-pending", verifyToken, approveOrDissaprove);
dogRouter.put("/dog-pending/all", verifyToken, approveOrDisapproveAll);

dogRouter.get("/dog/:id", getDogById);

dogRouter.get("/dog-pending/:id", verifyToken, getPendingDogById);

dogRouter.get("/temps-and-breedgroups", getTempsAndBreedGroups);

dogRouter.post("/like", verifyToken, likeDog);

export default dogRouter;
