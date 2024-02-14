import { RequestHandler } from "express";
import Dog from "../models/Dog.model";
import { Dog as DogType } from "../types/dog.types";
import data from "../../data";
import { getDogs, validateFilters, filterDogs } from "../services/dogServices";

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
    const { dogs } = await getDogs();
    const { dogsPage, totalPages} = filterDogs(dogs, validateFilters(filters), Number(page))

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
    const dog: DogType | null = await Dog.findByPk(id);
    if (!dog) return res.status(400).json({ error: "Dog not found" });

    const totalDogsLength: number = await Dog.count();

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
