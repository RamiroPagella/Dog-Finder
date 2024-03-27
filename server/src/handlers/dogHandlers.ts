import { RequestHandler, Request, urlencoded } from "express";
import DogModel from "../models/Dog.model";
import { Dog as DogType } from "../types/dog.types";
import {
  validateFilters,
  filterAndPageDogs,
  validateDog,
  hasFourDogs,
} from "../services/dogServices";
import UserModel from "../models/User.model";
import LikesModel from "../models/Likes.model";
import { IdUser } from "../types/user.types";
import { v2 as cloudinary } from "cloudinary";
import DogPendingModel from "../models/DogPending.model";
import { Op, Optional } from "sequelize";

interface ReqWithUser extends Request {
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
    const dog: DogType | null = await DogModel.findByPk(id, {
      include: {
        model: UserModel,
        as: "user",
        attributes: {
          exclude: ["admin", "password", "email", "id"],
        },
      },
    });
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

export const deleteDog: RequestHandler = async (req: ReqWithUser, res) => {
  try {
    const isAdmin = req.user?.admin;
    const userId = req.user?.id;
    const dogId = Number(req.query.id);

    if (!dogId || isNaN(dogId))
      return res.status(400).send("Missing or invalid data");

    const dog = await DogModel.findByPk(dogId);
    if (!dog) return res.status(400).send("Dog not found");

    if (!isAdmin && dog.userId !== userId) {
      return res.status(401).send("Unhautorized to delete this dog");
    }

    cloudinary.uploader.destroy(dog.name);
    await dog.destroy();
    res.status(200).send("Dog deleted succesfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};

export const ModifyDog: RequestHandler = async (req: ReqWithUser, res) => {
  try {
    const userId = req.user?.id;
    const multerImg = req.file;
    const bodyImg = req.body.img;
    const dogId = req.body.id;
    const verifiedDog: Omit<DogType, "img"> = validateDog(req.body);
    const type = req.query.type?.toString();

    if (
      typeof req.body.img === null ||
      req.body.img === "" ||
      !req.body.id ||
      isNaN(Number(req.body.id)) ||
      !dogId ||
      isNaN(Number(dogId)) ||
      (type !== "accepted" && type !== "pending")
    ) {
      return res.status(400).send("Incorrect or missing data");
    }

    const newDog: DogType = {
      ...verifiedDog,
      img: "",
    };

    const prevDog =
      type === "accepted"
        ? await DogModel.findByPk(dogId)
        : await DogPendingModel.findByPk(dogId);

    if (!prevDog) return res.status(400);
    if (prevDog.userId !== userId) return res.status(401);

    if (multerImg) {
      await cloudinary.uploader.destroy(prevDog.name);
      const imgAsString = multerImg?.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imgAsString}`,
        { public_id: verifiedDog.name.trim() },
      );
      newDog.img = result.url;
    } else {
      newDog.img = bodyImg;
    }

    await prevDog.destroy();
    await DogPendingModel.create(newDog as Optional<DogType, "id">);

    const newUser = await UserModel.findByPk(userId, {
      include: [
        { model: DogModel, as: "likes" },
        { model: DogModel, as: "dogs" },
        { model: DogPendingModel, as: "pendingDogs" },
      ],
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }
};

export const cancelPendingDog: RequestHandler = async (
  req: ReqWithUser,
  res,
) => {
  try {
    const userId = req.user?.id;
    const dogId = Number(req.query.id);
    if (!dogId || isNaN(dogId))
      return res.status(400).send("Missing or invalid data");

    const dog = await DogPendingModel.findByPk(dogId);

    if (!dog) return res.status(400).send("Dog not found");
    if (dog.userId !== userId) {
      return res.status(401).send("Unhautorized to delete this dog");
    }

    cloudinary.uploader.destroy(dog.name);
    await dog.destroy();

    res.status(200).send("Dog deleted succesfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
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

export const likeDog: RequestHandler = async (req: ReqWithUser, res) => {
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
      include: [
        { model: DogModel, as: "likes" },
        { model: DogModel, as: "dogs" },
        { model: DogPendingModel, as: "pendingDogs" },
      ],
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

export const createDog: RequestHandler = async (req: ReqWithUser, res) => {
  try {
    const userId = req.user?.id;
    const multerFile = req.file;
    if (!multerFile) return res.status(400).send("Missing data");

    if (await hasFourDogs(userId)) {
      return res.status(403).send("Already have four dogs");
    }

    const createdDog: Omit<DogType, "img"> = validateDog(req.body);

    const dogWithSameName = await DogModel.findOne({
      where: {
        name: createdDog.name,
      },
    });
    const pendingDogWithSameName = await DogPendingModel.findOne({
      where: { name: createdDog.name },
    });
    if (dogWithSameName || pendingDogWithSameName) {
      return res.status(409).send("Name already used");
    }

    const imageAsString = multerFile.buffer.toString("base64");
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageAsString}`,
      { public_id: req.body.name.trim() },
    );

    const Dog: DogType = { ...createdDog, img: result.url };

    const newDog = await DogPendingModel.create(Dog as Optional<DogType, "id">);

    res.status(200).send(newDog);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};

export const getPendingDogs: RequestHandler = async (req: ReqWithUser, res) => {
  try {
    const user = req.user;
    if (!user) res.status(401).send("Missing user data");
    if (!user?.admin) res.status(401).send("User is not admin");

    const { page, search } = req.query;

    if (
      !page ||
      isNaN(Number(page)) ||
      search === undefined ||
      search === null
    ) {
      return res.status(400).send("Missing or invalid data");
    }

    let pendingDogs = await DogPendingModel.findAll({
      include: {
        model: UserModel,
        as: "user",
        attributes: { exclude: ["password", "admin", "id", "email"] },
      },
    });

    if (search.toString() !== "") {
      pendingDogs = pendingDogs.filter((dog) =>
        dog.name.toLowerCase().includes(search.toString().trim().toLowerCase()),
      );
    }

    const itemsPerPage: number = 4;
    let pagedDogs: DogPendingModel[][] = [];

    for (let i = 0; i < pendingDogs.length; i += itemsPerPage) {
      const slice = pendingDogs.slice(i, i + itemsPerPage);
      pagedDogs.push(slice);
    }

    res.json({
      totalPages: pagedDogs.length,
      dogs: pagedDogs.length ? pagedDogs[Number(page) - 1] : [],
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};

export const getPendingDogById: RequestHandler = async (
  req: ReqWithUser,
  res,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send("Missing user data");

    const id = Number(req.params.id);
    if (!id) res.status(400).json({ error: "Incorrect or missing data" });

    const pendingDog = await DogPendingModel.findOne({
      where: {
        id,
      },
      include: {
        model: UserModel,
        as: "user",
        attributes: { exclude: ["id", "email", "password", "admin"] },
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

    if (!user.admin && pendingDog.userId !== user.id) {
      return res.status(403);
    }

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

export const approveOrDisapprove: RequestHandler = async (req, res) => {
  try {
    const id: DogType["id"] = req.body.id;
    const approve: boolean = req.body.approve;

    if (!id || typeof id !== "number" || typeof approve !== "boolean")
      res.status(400).json({ error: "Incorrect or missing data" });

    const pendingDog: DogPendingModel | null =
      await DogPendingModel.findByPk(id);

    if (!pendingDog) {
      return res.status(404).json({ error: "Pending dog not found" });
    }

    cloudinary.uploader.destroy(pendingDog.name);
    pendingDog?.destroy();

    if (!approve) return res.status(200).send("Dog disapproved succesfully");

    await DogModel.create({
      name: pendingDog.name,
      height: pendingDog.height,
      weight: pendingDog.weight,
      lifeSpan: pendingDog.lifeSpan,
      temperaments: pendingDog.temperaments,
      breedGroup: pendingDog.breedGroup,
      img: pendingDog.img,
      userId: pendingDog.userId,
    });

    res.status(200).send("Dog approved succesfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};

export const approveOrDisapproveAll: RequestHandler = async (req, res) => {
  try {
    const ids: Array<DogType["id"]> = req.body.ids;
    const approve: boolean = req.body.approve;

    if (!ids || !Array.isArray(ids) || typeof approve !== "boolean")
      res.status(400).json({ error: "Incorrect or missing data" });
    for (let id of ids) {
      if (typeof id !== "number") {
        res.status(400).json({ error: "Incorrect data" });
      }
    }

    const pendingDogs: DogPendingModel[] = await DogPendingModel.findAll({
      where: {
        id: ids,
      },
    });

    pendingDogs.forEach((dog) => {
      cloudinary.uploader.destroy(dog.name);
      return dog;
    });
    await Promise.all(
      pendingDogs.map(async (dog): Promise<void> => {
        dog.destroy();
      }),
    );

    await DogModel.bulkCreate(
      pendingDogs.map((dog) => ({
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        lifeSpan: dog.lifeSpan,
        temperaments: dog.temperaments,
        breedGroup: dog.breedGroup,
        img: dog.img,
        userId: dog.userId,
      })),
    );

    res.status(200).send("Dogs approved succesfully");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};
