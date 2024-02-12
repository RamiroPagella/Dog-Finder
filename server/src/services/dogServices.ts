import Dog from "../models/Dog.model";
import { DogFilters, Dog as DogType } from "../types/dog.types";
import { Op } from "sequelize";

export const getDogs = async (page: number, filters: DogFilters) => {
  const limit: number = 8;
  const offset: number = limit * (Number(page) - 1);

  const dogsPage: DogType[] = await Dog.findAll();

  const totalDogsLength: number = await Dog.count();
  
  return {
    dogsPage,
    totalPages: Math.ceil(totalDogsLength / limit)
  }
};



export const validateFilters = (dogFilters: unknown): DogFilters => {
  if (!dogFilters || typeof dogFilters !== "object")
    throw new Error("Incorrect or missing data");
  if (
    "search" in dogFilters &&
    "height" in dogFilters &&
    "weight" in dogFilters &&
    "temperaments" in dogFilters &&
    "breedGroup" in dogFilters &&
    "lifeSpan" in dogFilters
  ) {
    const filters = {
      search: dogFilters.search as string,
      height: parseHeight(dogFilters.height),
      weight: parseWeight(dogFilters.weight),
      temperaments: parseTemperaments(dogFilters.temperaments),
      breedGroup: dogFilters.breedGroup as string,
      lifeSpan: parseLifeSpan(dogFilters.lifeSpan)
    }
    return filters;
  }
  else throw new Error ('Incorrect or missing data');
};

//parser

const parseHeight = (height: unknown): DogFilters['height'] => {
  if (!isString(height) || !isHeight(height)) throw new Error ('Incorrect data');
  return height
}
const parseWeight = (weight: unknown): DogFilters['weight'] => {
  if (!isString(weight) || !isWeight(weight)) throw new Error ('Incorrect data');
  return weight;
}
const parseTemperaments = (temperaments: unknown): DogFilters['temperaments'] => {
  if (!isString(temperaments)) throw new Error ('Incorrect data');
  return temperaments.split(',').map(temp => {
    if (!isString(temp)) throw new Error ('Incorrect data');
    else return temp;
  })
}
const parseLifeSpan = (lifeSpan: unknown) => {
  if (!isString(lifeSpan) || !isLifeSpan(lifeSpan)) throw new Error ('Incorrect data');
  return lifeSpan;
}

//guardias de tipo

const regex = /^\d+ - \d+$/;
const isString = (string: unknown): string is string => {
  return typeof string === 'string';
}
const isHeight = (height: string): height is DogFilters['height'] => {
  if (height === '' || !isNaN(Number(height)) || regex.test(height)) {
    return true
  }
  else return false;
}
const isWeight = (weight: string): weight is DogFilters['weight']=> {
  if (weight === '' || !isNaN(Number(weight)) || regex.test(weight)) {
    return true
  }
  else return false;
}
const isLifeSpan = (lifeSpan: string): lifeSpan is DogFilters['lifeSpan'] => {
  const lifeSpanRegex = /^\d+ - \d+ years$/;
  if (!lifeSpanRegex.test(lifeSpan)) return true;
  else return false;
}

