"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendingDog = exports.getOwnPendingDog = exports.getOwnDog = exports.hasFourDogs = exports.validateDog = exports.validateFilters = exports.filterAndPageDogs = void 0;
const sequelize_1 = require("sequelize");
const Dog_model_1 = __importDefault(require("../models/Dog.model"));
const DogPending_model_1 = __importDefault(require("../models/DogPending.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const parsers_1 = require("./parsers");
const filterAndPageDogs = (dogs, filters) => {
    const { search, height, weight, temperaments, breedGroups, lifeSpan, sort, onlyCreated, page, } = filters;
    if (height !== "") {
        const selectedHeight = height.split(" - ");
        const minSelectedHeight = Number(selectedHeight[0]);
        const maxSelectedHeight = Number(selectedHeight[1]);
        dogs = dogs.filter((dog) => {
            const dogHeight = dog.height.split(" - ");
            const minDogHeight = Number(dogHeight[0]);
            const maxDogHeight = Number(dogHeight[1]); //puede ser undefined
            //en lugar de 'number - number' puede ser 'number', por eso se comprueba si tiene un elemento
            if ((minDogHeight > minSelectedHeight &&
                minDogHeight < maxSelectedHeight) ||
                (maxDogHeight > minSelectedHeight && maxDogHeight < maxSelectedHeight))
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
            if ((minDogWeight > minSelectedWeight &&
                minDogWeight < maxSelectedWeight) ||
                (maxDogWeight > minSelectedWeight && maxDogWeight < maxSelectedWeight))
                return true;
        });
    }
    //si no es un string vacio, es un array
    if (temperaments !== "") {
        console.log(temperaments);
        dogs = dogs.filter((dog) => {
            for (let i = 0; i < temperaments.length; i++) {
                if (dog.temperaments.includes(temperaments[i]))
                    return true;
            }
        });
    }
    if (breedGroups !== "") {
        dogs = dogs.filter((dog) => {
            for (let i = 0; i < breedGroups.length; i++) {
                if (breedGroups[i] === dog.breedGroup)
                    return true;
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
            if ((minDogLifeSpan > minSelectedLifeSpan &&
                minDogLifeSpan < maxSelectedLifeSpan) ||
                (maxDogLifeSpan > minSelectedLifeSpan &&
                    maxDogLifeSpan < maxSelectedLifeSpan))
                return true;
        });
    }
    if (search !== "") {
        const splitSearch = search.split(" ").map((word) => word.toLowerCase());
        dogs = dogs.filter((dog) => {
            for (let i = 0; i < splitSearch.length; i++) {
                if (dog.name.toLowerCase().includes(splitSearch[i]))
                    return true;
            }
        });
    }
    if (onlyCreated) {
        dogs = dogs.filter((dog) => (dog.userId ? true : false));
    }
    switch (sort) {
        case "A-Z":
            dogs = dogs.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
            break;
        case "Z-A":
            dogs = dogs.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1);
            break;
        case "height asc":
            dogs = dogs.sort((a, b) => a.height.split(" - ")[0] > b.height.split(" - ")[0] ? 1 : -1);
            break;
        case "height desc":
            dogs = dogs.sort((a, b) => a.height.split(" - ")[0] < b.height.split(" - ")[0] ? 1 : -1);
            break;
        case "weight asc":
            dogs = dogs.sort((a, b) => a.weight.split(" - ")[0] > a.weight.split(" - ")[0] ? 1 : -1);
            break;
        case "weight desc":
            dogs = dogs.sort((a, b) => a.weight.split(" - ")[0] < b.weight.split(" - ")[0] ? 1 : -1);
            break;
    }
    const itemsPerPage = 8;
    const pagedDogs = [];
    for (let i = 0; i < dogs.length; i += itemsPerPage) {
        const slice = dogs.slice(i, i + itemsPerPage);
        pagedDogs.push(slice);
    }
    return {
        dogsPage: pagedDogs[page - 1] ? pagedDogs[page - 1] : [],
        totalPages: pagedDogs.length,
    };
};
exports.filterAndPageDogs = filterAndPageDogs;
const validateFilters = (dogFilters) => {
    if (!dogFilters || typeof dogFilters !== "object")
        throw new Error("Incorrect or missing data");
    if ("search" in dogFilters &&
        "height" in dogFilters &&
        "weight" in dogFilters &&
        "temperaments" in dogFilters &&
        "breedGroups" in dogFilters &&
        "lifeSpan" in dogFilters &&
        "page" in dogFilters &&
        "sort" in dogFilters &&
        "onlyCreated" in dogFilters) {
        const filters = {
            page: parsers_1.filtersParsers.page(dogFilters.page),
            search: String(dogFilters.search),
            height: parsers_1.filtersParsers.heightAndWeight(dogFilters.height),
            weight: parsers_1.filtersParsers.heightAndWeight(dogFilters.weight),
            temperaments: parsers_1.filtersParsers.temperaments(dogFilters.temperaments),
            breedGroups: parsers_1.filtersParsers.breedGroups(dogFilters.breedGroups),
            lifeSpan: parsers_1.filtersParsers.lifeSpan(dogFilters.lifeSpan),
            sort: parsers_1.filtersParsers.sort(dogFilters.sort),
            onlyCreated: parsers_1.filtersParsers.onlyCreated(dogFilters.onlyCreated),
        };
        return filters;
    }
    else
        throw new Error("Incorrect or missing data");
};
exports.validateFilters = validateFilters;
const validateDog = (dog) => {
    if (!dog ||
        typeof dog !== "object" ||
        !("name" in dog) ||
        !("height" in dog) ||
        !("weight" in dog) ||
        !("temperaments" in dog) ||
        !("breedGroup" in dog) ||
        !("lifeSpan" in dog) ||
        !("userId" in dog)) {
        throw new Error("Incorrect or missing data");
    }
    const Dog = {
        name: parsers_1.dogParsers.name(dog.name),
        height: parsers_1.dogParsers.heightAndWeight(dog.height),
        weight: parsers_1.dogParsers.heightAndWeight(dog.weight),
        lifeSpan: parsers_1.dogParsers.lifeSpan(dog.lifeSpan),
        temperaments: parsers_1.dogParsers.temperaments(dog.temperaments),
        breedGroup: parsers_1.dogParsers.breedGroup(dog.breedGroup),
        userId: parsers_1.dogParsers.userId(dog.userId),
    };
    return Dog;
};
exports.validateDog = validateDog;
const hasFourDogs = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const DogsCount = yield Dog_model_1.default.count({
        where: {
            userId,
        },
    });
    const pendingDogsCount = yield DogPending_model_1.default.count({
        where: {
            userId,
        },
    });
    if (DogsCount + pendingDogsCount >= 4)
        return true;
    else
        return false;
});
exports.hasFourDogs = hasFourDogs;
const getOwnDog = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const dog = yield Dog_model_1.default.findByPk(id, {
        include: {
            model: User_model_1.default,
            as: "user",
            attributes: { exclude: ["id", "email", "password", "admin"] },
        },
    });
    if (!dog)
        throw new Error("Dog not found");
    const prevDog = yield Dog_model_1.default.findOne({
        where: {
            id: {
                [sequelize_1.Op.lt]: dog.id,
            },
            userId,
        },
        order: [["id", "DESC"]],
    });
    const nextDog = yield Dog_model_1.default.findOne({
        where: {
            id: {
                [sequelize_1.Op.gt]: dog.id,
            },
            userId,
        },
        order: [["id", "ASC"]],
    });
    const prevAndNext = {
        prev: prevDog ? prevDog.id : null,
        next: nextDog ? nextDog.id : null,
    };
    return {
        prevAndNext,
        dog,
    };
});
exports.getOwnDog = getOwnDog;
const getOwnPendingDog = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const pendingDog = yield DogPending_model_1.default.findByPk(id, {
        include: {
            model: User_model_1.default,
            as: "user",
            attributes: { exclude: ["id", "email", "password", "admin"] },
        },
    });
    if (!pendingDog)
        throw new Error("Pending dog not found");
    const prevPendingDog = yield DogPending_model_1.default.findOne({
        where: {
            id: {
                [sequelize_1.Op.lt]: pendingDog.id,
            },
            userId,
        },
        order: [["id", "DESC"]],
    });
    const nextPendingDog = yield DogPending_model_1.default.findOne({
        where: {
            id: {
                [sequelize_1.Op.gt]: pendingDog.id,
            },
            userId,
        },
        order: [["id", "ASC"]],
    });
    const prevAndNext = {
        prev: prevPendingDog ? prevPendingDog.id : null,
        next: nextPendingDog ? nextPendingDog.id : null,
    };
    return {
        prevAndNext,
        pendingDog,
    };
});
exports.getOwnPendingDog = getOwnPendingDog;
const getPendingDog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pendingDog = yield DogPending_model_1.default.findOne({
        where: {
            id,
        },
        include: {
            model: User_model_1.default,
            as: "user",
            attributes: { exclude: ["id", "email", "password", "admin"] },
        },
    });
    if (!pendingDog)
        throw new Error("Pending dog not found");
    const prevPendingDog = yield DogPending_model_1.default.findOne({
        where: {
            id: {
                [sequelize_1.Op.lt]: pendingDog.id,
            },
        },
        order: [["id", "DESC"]],
    });
    const nextPendingDog = yield DogPending_model_1.default.findOne({
        where: {
            id: {
                [sequelize_1.Op.gt]: pendingDog.id,
            },
        },
        order: [["id", "ASC"]],
    });
    const prevAndNext = {
        prev: prevPendingDog ? prevPendingDog.id : null,
        next: nextPendingDog ? nextPendingDog.id : null,
    };
    return {
        prevAndNext,
        pendingDog,
    };
});
exports.getPendingDog = getPendingDog;
