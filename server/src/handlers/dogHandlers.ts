import { RequestHandler } from "express";
import Dog from "../models/Dog.model";
import { Dog as DogType } from "../types/dog.types";
import { dogByName } from "../services/dogServices";
import data from "../../data";

export const GetDogs: RequestHandler = async (req, res) => {
  const { page } = req.query;
  if (!page) return res.status(400).json({ error: "Page not provided" });

  const limit: number = 8;
  const offset: number = 8 * Number(page);

  try {
    const dogsPage: DogType[] = await Dog.findAll({
      offset,
      limit,
    });
    if (!dogsPage.length)
      return res.status(400).json({ error: "Page does not exist" });

    const totalDogsLength: number = await Dog.count();

    res.status(200).json({
      dogs: dogsPage,
      totalPages: Math.floor(totalDogsLength / limit),
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
  const id = Number(req.params.id.slice(1));
  
  if (!id || typeof id !== "number") {
    return res.status(400).json({ error: "Incorrect or missing data" });
  }
  
  try {
    const dog: DogType | null = await Dog.findByPk(id);
    if (!dog) return res.status(400).json({ error: "Dog not found" });

    return res.status(200).json({ message: "Dog fetched succesfully", dog });
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
    console.log(error);
  }
};
