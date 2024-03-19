import { RequestHandler, Request } from "express";
import DogModel from "../models/Dog.model";
import { Dog as DogType } from "../types/dog.types";
import data from "../../data";
import {
  validateFilters,
  filterAndPageDogs,
  validateDog,
} from "../services/dogServices";
import UserModel from "../models/User.model";
import LikesModel from "../models/Likes.model";
import { IdUser } from "../types/user.types";
import { v2 as cloudinary } from "cloudinary";
import DogPendingModel from "../models/DogPending.model";
import { Op, Optional } from "sequelize";

interface CustomRequest extends Request {
  user?: IdUser;
}

export const GetDogs: RequestHandler = async (req, res) => {
  const filters = validateFilters(req.query);

  try {
    const dogs: DogType[] = (await DogModel.findAll()).map(
      (dog) => dog.dataValues,
    );

    const { dogsPage, totalPages } = filterAndPageDogs(dogs, filters);

    //
    res.status(200).json({
      dogs: dogsPage,
      totalPages,
      message: "Data fetched succesfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};

export const getDogById: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  if (!id || typeof id !== "number") {
    return res.status(400).json({ error: "Incorrect or missing data" });
  }

  try {
    const dog: DogType | null = await DogModel.findByPk(id);
    if (!dog) return res.status(400).json({ error: "Dog not found" });

    const prevDog: DogModel | null = await DogModel.findOne({
      where: {
        id: {
          [Op.lt]: dog.id,
        },
      },
      order: [["id", "DESC"]],
    });

    const nextDog: DogModel | null = await DogModel.findOne({
      where: {
        id: {
          [Op.gt]: dog.id,
        },
      },
      order: [["id", "ASC"]],
    });

    const prevAndNext = {
      prev: prevDog ? prevDog.id : null,
      next: nextDog ? nextDog.id : null,
    };

    return res
      .status(200)
      .json({ message: "Dog fetched succesfully", dog, prevAndNext });
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};

export const getTempsAndBreedGroups: RequestHandler = async (req, res) => {
  try {
    const dogs: DogType[] = (await DogModel.findAll()).map(
      (dog) => dog.dataValues,
    );
    const temps: string[] = [];
    const breedGroups: DogType["breedGroup"][] = [];

    dogs.forEach((dog) => {
      if (Array.isArray(dog.temperaments)) {
        dog.temperaments.forEach((temp) => {
          if (!temps.includes(temp)) temps.push(temp);
        });
      } else {
        if (!temps.includes(dog.temperaments)) temps.push(dog.temperaments);
      }

      if (!breedGroups.includes(dog.breedGroup))
        breedGroups.push(dog.breedGroup);
    });

    return res.status(200).json({
      temperaments: temps,
      breedGroups,
    });
  } catch (error) {
    res
      .status(200)
      .send({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};

export const likeDog: RequestHandler = async (req: CustomRequest, res) => {
  try {
    const { dogId } = req.body;
    const user = req.user;

    const [like, created] = await LikesModel.findOrCreate({
      where: { dogId, userId: user?.id },
      defaults: {
        dogId,
        userId: user?.id,
      },
    });
    if (!created) {
      await LikesModel.destroy({
        where: { dogId, userId: user?.id },
      });
    }

    const User = await UserModel.findByPk(user?.id, {
      include: { model: DogModel, as: "likes" },
    });

    if (!User) return res.status(404).send("User not found");

    res.json({ User, isFav: created });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: error instanceof Error ? error.message : error });
  }
};

export const createDog: RequestHandler = async (req, res) => {
  try {
    const createdDog: Omit<DogType, "img"> = validateDog(req.body);

    const imageAsString = req.file?.buffer.toString("base64");
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageAsString}`,
      { public_id: req.body.name },
    );

    const Dog: DogType = { ...createdDog, img: result.url };

    await DogPendingModel.create(Dog as Optional<DogType, "id">);

    res.status(200).send("Dog created succesfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};

export const getPendingDogs: RequestHandler = async (req, res) => {
  try {
    const pendingDogs = await DogPendingModel.findAll({
      include: {
        model: UserModel,
        as: "user",
        attributes: { exclude: ["password", "admin"] },
      },
    });
    res.json(pendingDogs);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};

export const getPendingDogById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const pendingDog = await DogPendingModel.findOne({
      where: {
        id,
      },
    });
    if (!pendingDog) return res.status(404).send("Pending dog not found");

    const prevPendingDog: DogPendingModel | null =
      await DogPendingModel.findOne({
        where: {
          id: {
            [Op.lt]: pendingDog.id,
          },
        },
        order: [["id", "DESC"]],
      });

    const nextPendingDog: DogPendingModel | null =
      await DogPendingModel.findOne({
        where: {
          id: {
            [Op.gt]: pendingDog.id,
          },
        },
        order: [["id", "ASC"]],
      });

    const prevAndNext = {
      prev: prevPendingDog ? prevPendingDog.id : null,
      next: nextPendingDog ? nextPendingDog.id : null,
    };

    res.status(200).json({
      message: "pending dog fetched succesfully",
      dog: pendingDog,
      prevAndNext,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};

export const approveOrDissaproveDog: RequestHandler = async (req, res) => {
  try {
    const { id, isApproved } = req.body;

    const pendingDog: DogPendingModel | null =
      await DogPendingModel.findByPk(id);

    if (!pendingDog) {
      return res.status(404).json({ error: "Pending dog not found" });
    }

    pendingDog?.destroy();

    if (!isApproved) return res.status(200).send("Dog disapproved succesfully");

    await DogModel.create({
      name: pendingDog.name,
      height: pendingDog.height,
      weight: pendingDog.weight,
      lifeSpan: pendingDog.lifeSpan,
      temperaments: pendingDog.temperaments,
      breedGroup: pendingDog.breedGroup,
      img: pendingDog.img,
      userId: pendingDog.userId
    });

    res.status(200).send("Dog approved succesfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};
