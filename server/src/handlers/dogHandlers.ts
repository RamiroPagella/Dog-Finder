import { RequestHandler } from "express";
import Dog from "../models/Dog.model";
import { DogType } from "../types/dog.types";
import { dogByName } from "../services/dogServices";

export const GetAllDogs: RequestHandler = async (req, res) => {
  const { name } = req.query;
  if (name) {
    if (typeof name !== "string") {
      return res.status(400).json({ message: "Incorrect name" });
    }
    const dog = await dogByName(name);
    return res.status(200).json({message: 'Dog found succesfully', dog});
  } else {
    const dogs = await Dog.findAll();
    return res
      .status(200)
      .json({ message: "Data fetched succesfully", dogs });
  }
};

