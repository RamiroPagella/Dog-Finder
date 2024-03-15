import { RequestHandler, Request } from "express";
import DogModel from "../models/Dog.model";
import { Dog as DogType } from "../types/dog.types";
import data from "../../data";
import { validateFilters, filterDogs } from "../services/dogServices";
import UserModel from "../models/User.model";
import LikesModel from "../models/Likes.model";
import { IdUser } from "../types/user.types";
import { v2 as cloudinary } from "cloudinary";
import DogPendingModel from "../models/DogPending.model";

interface CustomRequest extends Request {
  user?: IdUser;
}

export const GetDogsHandler: RequestHandler = async (req, res) => {
  const { page, search, weight, height, temperaments, breedGroup, lifeSpan } =
    req.query;
  const filters = {
    search,
    weight,
    height,
    temperaments,
    breedGroup,
    lifeSpan,
  };
  try {
    const dogs: DogType[] = (await DogModel.findAll()).map(
      (dog) => dog.dataValues,
    );

    const { dogsPage, totalPages } = filterDogs(
      dogs,
      validateFilters(filters),
      Number(page),
    );

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

    const totalDogsLength: number = await DogModel.count();

    const hasPrevAndNext = {
      prev: id !== 1,
      next: id !== totalDogsLength,
    };

    return res
      .status(200)
      .json({ message: "Dog fetched succesfully", dog, hasPrevAndNext });
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
    const data = req.body;
    const imageAsString = req.file?.buffer.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageAsString}`,
      { public_id: data.name },
    );

    const Dog = data;
    Dog.img = result.url;

    console.log(Dog);
    await DogPendingModel.create(Dog);

    res.status(200).send('Dog created succesfully');
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
      include: { model: UserModel, as: "user" },
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
    if (!pendingDog) res.status(404).send("Pending dog not found");

    res.status(200).json({
      message: "pending dog fetched succesfully",
      dog: pendingDog,
      hasPrevAndNext: { prev: false, next: false },
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

    if (!pendingDog) return res.status(404).json({error: 'Pending dog not found'});

    pendingDog?.destroy();

    if (!isApproved) return res.status(200).send("Dog disapproved succesfully");

    await DogModel.create({
      name: pendingDog.name,
      height: pendingDog.height,
      weight: pendingDog.weight,
      lifeSpan: pendingDog.lifeSpan,
      temperaments: pendingDog.temperaments,
      breedGroup: pendingDog.breedGroup,
      img: pendingDog.img
    });

    res.status(200).send("Dog approved succesfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
      console.log(error);
  }
};
