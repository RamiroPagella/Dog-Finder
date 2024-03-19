import { Dog, DogFilters } from "../types/dog.types";

//parsers
export const dogParsers = {
  name: (name: unknown): Dog["name"] => {
    if (!isString(name) || name.length > 30) throw new Error("Incorrect data");
    return name;
  },
  heightAndWeight: (heightOrWeight: unknown): Dog["height"] | Dog["weight"] => {
    if (
      !isString(heightOrWeight) ||
      !dogTypeGuards.isHeightOrWeight(heightOrWeight)
    )
      throw new Error("Incorrect data");
    return heightOrWeight;
  },
  lifeSpan: (lifeSpan: unknown): Dog["lifeSpan"] => {
    if (!isString(lifeSpan) || !dogTypeGuards.isLifeSpan(lifeSpan))
      throw new Error("Incorrect or missing data");
    return lifeSpan;
  },
  temperaments: (temperaments: unknown): Dog["temperaments"] => {
    if (!dogTypeGuards.isTemperaments(temperaments)) {
      throw new Error("Incorrect or missing data");
    }
    return temperaments;
  },
  breedGroup: (breedGroup: unknown): Dog["breedGroup"] => {
    if (!isString(breedGroup) || !dogTypeGuards.isBreedGroup(breedGroup)) {
      throw new Error("Incorrect or missing data");
    }
    return breedGroup;
  },
  userId: (userId: unknown): Dog["userId"] => {
    if (!isString(userId) || !isUuid(userId)) {
      throw new Error("Incorrect or missing data");
    }
    return userId;
  },
};

export const filtersParsers = {
  heightAndWeight: (
    height: unknown,
  ): DogFilters["height"] | DogFilters["weight"] => {
    if (!isString(height) || !filtersTypeGuards.isHeightOrWeight(height))
      throw new Error("Incorrect data");
    return height;
  },
  temperaments: (temperaments: unknown): DogFilters["temperaments"] => {
    if (!isString(temperaments)) throw new Error("Incorrect data");

    if (temperaments === "") return temperaments;

    return temperaments.split(",").map((temp) => {
      if (!isString(temp)) throw new Error("Incorrect data");
      return temp;
    });
  },
  breedGroup: (breedGroup: unknown): DogFilters["breedGroup"] => {
    if (breedGroup === "") return breedGroup;
    if (!isString(breedGroup) || !dogTypeGuards.isBreedGroup(breedGroup))
      throw new Error("Incorrect or missing data");
    return breedGroup;
  },
  lifeSpan: (lifeSpan: unknown) => {
    if (!isString(lifeSpan) || !filtersTypeGuards.isLifeSpan(lifeSpan))
      throw new Error("Incorrect data");
    return lifeSpan;
  },
  page: (page: unknown) => {
    if (!isString(page) || isNaN(Number(page)))
      throw new Error("Incorrect data");
    return Number(page);
  },
};
////

const regex = /^\d+ - \d+$/;

const isString = (string: unknown): string is string => {
  return typeof string === "string";
};
const isUuid = (string: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(string);
};

//typeGuards
const dogTypeGuards = {
  isHeightOrWeight: (
    heightOrWeight: string,
  ): heightOrWeight is Dog["height"] | Dog["weight"] => {
    if (
      !/^\d+\s*-\s*\d+$/.test(heightOrWeight) &&
      isNaN(Number(heightOrWeight))
    )
      return false;
    return true;
  },
  isLifeSpan: (lifeSpan: string): lifeSpan is Dog["lifeSpan"] => {
    const lifeSpanRegex = /^(\d+)\s*(?:-\s*(\d+))?\s+years$/;
    return lifeSpanRegex.test(lifeSpan);
  },
  isTemperaments: (
    temperaments: unknown,
  ): temperaments is Dog["temperaments"] => {
    if (!Array.isArray(temperaments) || temperaments.length === 0) return false;
    for (let temp of temperaments) {
      if (!isString(temp)) return false;
    }
    return true;
  },
  isBreedGroup: (breedGroup: string): breedGroup is Dog["breedGroup"] => {
    const existingBreedGroups = [
      "Toy",
      "Hound",
      "Unknown",
      "Terrier",
      "Working",
      "Mixed",
      "Non-Sporting",
      "Sporting",
      "Herding",
    ];
    for (let bg of existingBreedGroups) {
      if (bg === breedGroup) return true;
    }
    return false;
  },
};

const filtersTypeGuards = {
  isHeightOrWeight: (
    heightOrWeight: string,
  ): heightOrWeight is DogFilters["height"] | DogFilters["weight"] => {
    if (heightOrWeight === "" || regex.test(heightOrWeight)) {
      return true;
    } else return false;
  },
  isLifeSpan: (lifeSpan: string): lifeSpan is DogFilters["lifeSpan"] => {
    const lifeSpanRegex = /^\d+ - \d+ years$/;
    if (!lifeSpanRegex.test(lifeSpan)) return true;
    else return false;
  },
};
////
