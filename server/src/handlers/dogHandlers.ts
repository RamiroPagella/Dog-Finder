import { RequestHandler } from "express";
import Dog from "../models/Dog.model";
import { DogType } from "../types/dog.types";
import { dogByName } from "../services/dogServices";
import data from "../../data";

export const GetDogs: RequestHandler = async (req, res) => {
  try {
    const { page } = req.query;

    const limit: number = 16;
    const offset: number = Number(page) * limit;

    const dogs: DogType[] = await Dog.findAll({
      offset,
      limit,
    });
    const notPagedDogsLength: number = await Dog.count();

    const hasNextPage: boolean = notPagedDogsLength - offset > 0;

    res
      .status(200)
      .json({ message: "Data fetched succesfully", dogs, hasNextPage });
  } catch (error) {
    console.log(error);
  }
};
