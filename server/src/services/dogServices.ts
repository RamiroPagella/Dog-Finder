import DogModel from "../models/Dog.model";
import DogPendingModel from "../models/DogPending.model";
import { Dog, DogFilters, Dog as DogType } from "../types/dog.types";
import { dogParsers, filtersParsers } from "./parsers";

export const filterAndPageDogs = (dogs: DogType[], filters: DogFilters) => {
  const {
    search,
    height,
    weight,
    temperaments,
    breedGroups,
    lifeSpan,
    sort,
    onlyCreated,
  } = filters;

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
    console.log(temperaments);

    dogs = dogs.filter((dog) => {
      for (let i = 0; i < temperaments.length; i++) {
        if (dog.temperaments.includes(temperaments[i])) return true;
      }
    });
  }

  if (breedGroups !== "") {
    dogs = dogs.filter((dog) => {
      for (let i = 0; i < breedGroups.length; i++) {
        if (breedGroups[i] === dog.breedGroup) return true;
      }
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

  if (search !== "") {
    const splitSearch = search.split(" ").map((word) => word.toLowerCase());
    dogs = dogs.filter((dog) => {
      for (let i = 0; i < splitSearch.length; i++) {
        if (dog.name.toLowerCase().includes(splitSearch[i])) return true;
      }
    });
  }

  if (onlyCreated) {
    dogs = dogs.filter((dog) => (dog.userId ? true : false));
  }

  switch (sort) {
    case "A-Z":
      dogs = dogs.sort((a, b) =>
        a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
      );
      break;
    case "Z-A":
      dogs = dogs.sort((a, b) =>
        a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1,
      );
      break;
    case "height asc":
      dogs = dogs.sort((a, b) =>
        a.height.split(" - ")[0] > b.height.split(" - ")[0] ? 1 : -1,
      );
      break;

    case "height desc":
      dogs = dogs.sort((a, b) =>
        a.height.split(" - ")[0] < b.height.split(" - ")[0] ? 1 : -1,
      );
      break;

    case "weight asc":
      dogs = dogs.sort((a, b) =>
        a.weight.split(" - ")[0] > a.weight.split(" - ")[0] ? 1 : -1,
      );
      break;

    case "weight desc":
      dogs = dogs.sort((a, b) =>
        a.weight.split(" - ")[0] < b.weight.split(" - ")[0] ? 1 : -1,
      );
      break;
  }

  const itemsPerPage: number = 8;
  const pagedDogs: DogType[][] = [];

  for (let i = 0; i < dogs.length; i += itemsPerPage) {
    const slice = dogs.slice(i, i + itemsPerPage);
    pagedDogs.push(slice);
  }

  return {
    dogsPage: pagedDogs[filters.page - 1] ? pagedDogs[filters.page - 1] : [],
    totalPages: pagedDogs.length,
  };
};

export const validateFilters = (dogFilters: unknown): DogFilters => {
  if (!dogFilters || typeof dogFilters !== "object")
    throw new Error("Incorrect or missing data");
  if (
    "search" in dogFilters &&
    "height" in dogFilters &&
    "weight" in dogFilters &&
    "temperaments" in dogFilters &&
    "breedGroups" in dogFilters &&
    "lifeSpan" in dogFilters &&
    "page" in dogFilters &&
    "sort" in dogFilters && 
    "onlyCreated" in dogFilters
  ) {
    const filters = {
      page: filtersParsers.page(dogFilters.page),
      search: String(dogFilters.search),
      height: filtersParsers.heightAndWeight(dogFilters.height),
      weight: filtersParsers.heightAndWeight(dogFilters.weight),
      temperaments: filtersParsers.temperaments(dogFilters.temperaments),
      breedGroups: filtersParsers.breedGroups(dogFilters.breedGroups),
      lifeSpan: filtersParsers.lifeSpan(dogFilters.lifeSpan),
      sort: filtersParsers.sort(dogFilters.sort),
      onlyCreated: filtersParsers.onlyCreated(dogFilters.onlyCreated)
    };
    return filters;
  } else throw new Error("Incorrect or missing data");
};

export const validateDog = (dog: unknown): Omit<Dog, "img"> => {
  if (
    !dog ||
    typeof dog !== "object" ||
    !("name" in dog) ||
    !("height" in dog) ||
    !("weight" in dog) ||
    !("temperaments" in dog) ||
    !("breedGroup" in dog) ||
    !("lifeSpan" in dog) ||
    !("userId" in dog)
  ) {
    throw new Error("Incorrect or missing data");
  }

  const Dog: Omit<Dog, "img"> = {
    name: dogParsers.name(dog.name),
    height: dogParsers.heightAndWeight(dog.height),
    weight: dogParsers.heightAndWeight(dog.weight),
    lifeSpan: dogParsers.lifeSpan(dog.lifeSpan),
    temperaments: dogParsers.temperaments(dog.temperaments),
    breedGroup: dogParsers.breedGroup(dog.breedGroup),
    userId: dogParsers.userId(dog.userId),
  };

  return Dog;
};

export const hasFourDogs = async (userId: Dog["userId"]): Promise<boolean> => {
  const DogsCount: number = await DogModel.count({
    where: {
      userId,
    },
  });
  const pendingDogsCount: number = await DogPendingModel.count({
    where: {
      userId,
    },
  });
  if (DogsCount + pendingDogsCount >= 4) return true;
  else return false;
};
