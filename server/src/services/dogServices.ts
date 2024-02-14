import Dog from "../models/Dog.model";
import { DogFilters, Dog as DogType } from "../types/dog.types";
import { Op } from "sequelize";

export const getDogs = async () => {
  const dogs: DogType[] = await Dog.findAll();

  const totalDogsLength: number = await Dog.count();
  const dogsPerPage: number = 8;

  return {
    dogs,
    totalPages: Math.ceil(totalDogsLength / dogsPerPage),
  };
};

export const filterDogs = (
  dogs: DogType[],
  filters: DogFilters,
  page: number,
) => {
  const { height, weight, temperaments, breedGroup, lifeSpan } = filters;

  if (height !== "") {
    const selectedHeight = height.split(" - ");
    const minSelectedHeight = Number(selectedHeight[0]);
    const maxSelectedHeight = Number(selectedHeight[1]);

    dogs = dogs.filter((dog) => {
      const dogHeight = dog.height.split(" - ");
      const minDogHeight = Number(dogHeight[0]);
      const maxDogHeight = Number(dogHeight[1]); //puede ser undefined
      //en lugar de 'number - number' puede ser 'number', por eso se comprueba si tiene un elemento
      if (
        (minDogHeight > minSelectedHeight &&
          minDogHeight < maxSelectedHeight) ||
        (maxDogHeight > minSelectedHeight && maxDogHeight < maxSelectedHeight)
      )
        return true;
    });
  }

  if (weight !== "") {
    const selectedWeight = weight.split(" - ");
    const minSelectedWeight = Number(selectedWeight[0]);
    const maxSelectedWeight = Number(selectedWeight[1]);

    dogs = dogs.filter((dog) => {
      const dogWeight = dog.weight.split(" - ");
      const minDogWeight = Number(dogWeight[0]);
      const maxDogWeight = Number(dogWeight[1]);

      if (
        (minDogWeight > minSelectedWeight &&
          minDogWeight < maxSelectedWeight) ||
        (maxDogWeight > minSelectedWeight && maxDogWeight < maxSelectedWeight)
      )
        return true;
    });
  }
  //si no es un string vacio, es un array
  if (temperaments !== "") {
    dogs = dogs.filter((dog) => {
      for (let i = 0; i < temperaments.length; i++) {
        if (dog.temperaments.includes(temperaments[i])) return true;
      }
    });
  }

  if (breedGroup !== "") {
    dogs = dogs.filter((dog) => {
      return dog.breedGroup === breedGroup ? true : false;
    });
  }

  if (lifeSpan !== "") {
    const selectedLifeSpan = lifeSpan
      .split(" ")
      .filter((e) => (!isNaN(Number(e)) ? true : false))
      .map((num) => Number(num));
    const minSelectedLifeSpan = selectedLifeSpan[0];
    const maxSelectedLifeSpan = selectedLifeSpan[1];

    dogs = dogs.filter((dog) => {
      const dogLifeSpan = dog.lifeSpan
        .split(" ")
        .filter((e) => (!isNaN(Number(e)) ? true : false))
        .map((num) => Number(num));
      const minDogLifeSpan = dogLifeSpan[0];
      const maxDogLifeSpan = dogLifeSpan[1];

      if (
        (minDogLifeSpan > minSelectedLifeSpan &&
          minDogLifeSpan < maxSelectedLifeSpan) ||
        (maxDogLifeSpan > minSelectedLifeSpan &&
          maxDogLifeSpan < maxSelectedLifeSpan)
      )
        return true;
    });
  }

  const itemsPerPage: number = 8;
  const pagedDogs: DogType[][] = [];

  for (let i = 0; i < dogs.length; i += itemsPerPage) {
    pagedDogs.push(dogs.slice(i, itemsPerPage));
  }

  return {
    dogsPage: pagedDogs[page - 1],
    totalPages: pagedDogs.length
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
      search: String(dogFilters.search),
      height: parseHeight(dogFilters.height),
      weight: parseWeight(dogFilters.weight),
      temperaments: parseTemperaments(dogFilters.temperaments),
      breedGroup: dogFilters.breedGroup as string,
      lifeSpan: parseLifeSpan(dogFilters.lifeSpan),
    };
    return filters;
  } else throw new Error("Incorrect or missing data");
};

//parser

const parseHeight = (height: unknown): DogFilters["height"] => {
  if (!isString(height) || !isHeight(height)) throw new Error("Incorrect data");
  return height;
};
const parseWeight = (weight: unknown): DogFilters["weight"] => {
  if (!isString(weight) || !isWeight(weight)) throw new Error("Incorrect data");
  return weight;
};
const parseTemperaments = (
  temperaments: unknown,
): DogFilters["temperaments"] => {
  if (!isString(temperaments)) throw new Error("Incorrect data");
  return temperaments.split(",").map((temp) => {
    if (!isString(temp)) throw new Error("Incorrect data");
    return temp;
  });
};
const parseLifeSpan = (lifeSpan: unknown) => {
  if (!isString(lifeSpan) || !isLifeSpan(lifeSpan))
    throw new Error("Incorrect data");
  return lifeSpan;
};

//guardias de tipo

const regex = /^\d+ - \d+$/;
const isString = (string: unknown): string is string => {
  return typeof string === "string";
};
const isHeight = (height: string): height is DogFilters["height"] => {
  if (height === "" || regex.test(height)) {
    return true;
  } else return false;
};
const isWeight = (weight: string): weight is DogFilters["weight"] => {
  if (weight === "" || regex.test(weight)) {
    return true;
  } else return false;
};
const isLifeSpan = (lifeSpan: string): lifeSpan is DogFilters["lifeSpan"] => {
  const lifeSpanRegex = /^\d+ - \d+ years$/;
  if (!lifeSpanRegex.test(lifeSpan)) return true;
  else return false;
};
