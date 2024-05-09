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
exports.approveOrDisapproveAll = exports.approveOrDisapprove = exports.getOwnPendingDogById = exports.getPendingDogById = exports.getPendingDogs = exports.createDog = exports.likeDog = exports.getTempsAndBreedGroups = exports.cancelPendingDog = exports.ModifyDog = exports.deleteDog = exports.getOwnDogById = exports.GetDogs = void 0;
const Dog_model_1 = __importDefault(require("../models/Dog.model"));
const dogServices_1 = require("../services/dogServices");
const User_model_1 = __importDefault(require("../models/User.model"));
const Likes_model_1 = __importDefault(require("../models/Likes.model"));
const cloudinary_1 = require("cloudinary");
const DogPending_model_1 = __importDefault(require("../models/DogPending.model"));
const GetDogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, dogServices_1.validateFilters)(req.query);
    try {
        const dogs = (yield Dog_model_1.default.findAll()).map((dog) => dog.dataValues);
        const { dogsPage, totalPages } = (0, dogServices_1.filterAndPageDogs)(dogs, filters);
        //
        res.status(200).json({
            dogs: dogsPage,
            totalPages,
            message: "Data fetched successfully",
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : error });
        console.log(error);
    }
});
exports.GetDogs = GetDogs;
// const prevDogSeqConfig: FindOptions = {};
// const nextDogSeqConfig: FindOptions = {};
// if (sort === "A-Z") {
//   prevDogSeqConfig.where = {
//     name: { [Op.lt]: dog.name },
//   };
//   prevDogSeqConfig.order = [["name", "DESC"]];
//   nextDogSeqConfig.where = {
//     name: { [Op.gt]: dog.name },
//   };
//   nextDogSeqConfig.order = [["name", "ASC"]];
// } else if (sort === "Z-A") {
//   prevDogSeqConfig.where = {
//     name: { [Op.gt]: dog.name },
//   };
//   prevDogSeqConfig.order = [["name", "ASC"]];
//   nextDogSeqConfig.where = {
//     name: { [Op.lt]: dog.name },
//   };
//   nextDogSeqConfig.order = [["name", "DESC"]];
// // }
// export const getDogById: RequestHandler = async (req, res) => {
//   const id = Number(req.params.id);
//   const sort = req.query.sort?.toString();
//   if (!id || typeof id !== "number") {
//     return res.status(400).json({ error: "Incorrect or missing data" });
//   }
//   try {
//     const dog: DogType | null = await DogModel.findByPk(id, {
//       include: {
//         model: UserModel,
//         as: "user",
//         attributes: {
//           exclude: ["admin", "password", "email", "id"],
//         },
//       },
//     });
//     if (!dog) return res.status(404).json({ error: "Dog not found" });
//     const prevDog: DogModel | null = await DogModel.findOne({
//       where: {
//         id: {
//           [Op.lt]: dog.id,
//         },
//       },
//       order: [["id", "DESC"]],
//     });
//     const nextDog: DogModel | null = await DogModel.findOne({
//       where: {
//         id: {
//           [Op.gt]: dog.id,
//         },
//       },
//       order: [["id", "ASC"]],
//     });
//     const prevAndNext = {
//       prev: prevDog ? prevDog.id : null,
//       next: nextDog ? nextDog.id : null,
//     };
//     return res
//       .status(200)
//       .json({ message: "Dog fetched successfully", dog, prevAndNext });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: error instanceof Error ? error.message : error });
//     console.log(error);
//   }
// };
const getOwnDogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const dogId = Number(req.params.id);
        if (!user || !dogId) {
            return res.status(400).send("Incorrect or missing data");
        }
        const { dog, prevAndNext } = yield (0, dogServices_1.getOwnDog)(dogId, user.id);
        if (dog.userId !== user.id)
            return res.status(403);
        return res.status(200).json({
            dog,
            prevAndNext,
        });
    }
    catch (error) {
        let status = 500;
        if (error instanceof Error && error.message === "Dog not found")
            status = 404;
        res
            .status(status)
            .json({ error: error instanceof Error ? error.message : error });
    }
});
exports.getOwnDogById = getOwnDogById;
const deleteDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const isAdmin = (_a = req.user) === null || _a === void 0 ? void 0 : _a.admin;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const dogId = Number(req.query.id);
        if (!dogId || isNaN(dogId))
            return res.status(400).send("Missing or invalid data");
        const dog = yield Dog_model_1.default.findByPk(dogId);
        if (!dog)
            return res.status(400).send("Dog not found");
        if (!isAdmin && dog.userId !== userId) {
            return res.status(401).send("Unhautorized to delete this dog");
        }
        cloudinary_1.v2.uploader.destroy(dog.name);
        yield dog.destroy();
        res.status(200).send("Dog deleted successfully");
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : error });
    }
});
exports.deleteDog = deleteDog;
const ModifyDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const multerImg = req.file;
        const bodyImg = req.body.img;
        const dogId = req.body.id;
        const verifiedDog = (0, dogServices_1.validateDog)(req.body);
        const type = (_d = req.query.type) === null || _d === void 0 ? void 0 : _d.toString();
        if (typeof req.body.img === null ||
            req.body.img === "" ||
            !req.body.id ||
            isNaN(Number(req.body.id)) ||
            !dogId ||
            isNaN(Number(dogId)) ||
            (type !== "accepted" && type !== "pending")) {
            return res.status(400).send("Incorrect or missing data");
        }
        const newDog = Object.assign(Object.assign({}, verifiedDog), { img: "" });
        const prevDog = type === "accepted"
            ? yield Dog_model_1.default.findByPk(dogId)
            : yield DogPending_model_1.default.findByPk(dogId);
        if (!prevDog)
            return res.status(400);
        if (prevDog.userId !== userId)
            return res.status(401);
        if (multerImg) {
            yield cloudinary_1.v2.uploader.destroy(prevDog.name);
            const imgAsString = multerImg === null || multerImg === void 0 ? void 0 : multerImg.buffer.toString("base64");
            const result = yield cloudinary_1.v2.uploader.upload(`data:image/png;base64,${imgAsString}`, { public_id: verifiedDog.name.trim() });
            newDog.img = result.url;
        }
        else {
            newDog.img = bodyImg;
        }
        yield prevDog.destroy();
        yield DogPending_model_1.default.create(newDog);
        const newUser = yield User_model_1.default.findByPk(userId, {
            include: [
                { model: Dog_model_1.default, as: "likes" },
                { model: Dog_model_1.default, as: "dogs" },
                { model: DogPending_model_1.default, as: "pendingDogs" },
            ],
            attributes: {
                exclude: ["password"],
            },
        });
        res.status(200).json(newUser);
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
});
exports.ModifyDog = ModifyDog;
const cancelPendingDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
        const dogId = Number(req.query.id);
        if (!dogId || isNaN(dogId))
            return res.status(400).send("Missing or invalid data");
        const dog = yield DogPending_model_1.default.findByPk(dogId);
        if (!dog)
            return res.status(400).send("Dog not found");
        if (dog.userId !== userId) {
            return res.status(401).send("Unhautorized to delete this dog");
        }
        cloudinary_1.v2.uploader.destroy(dog.name);
        yield dog.destroy();
        res.status(200).send("Dog deleted successfully");
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : error });
    }
});
exports.cancelPendingDog = cancelPendingDog;
const getTempsAndBreedGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dogs = (yield Dog_model_1.default.findAll()).map((dog) => dog.dataValues);
        const temps = [];
        const breedGroups = [];
        dogs.forEach((dog) => {
            if (Array.isArray(dog.temperaments)) {
                dog.temperaments.forEach((temp) => {
                    if (!temps.includes(temp))
                        temps.push(temp);
                });
            }
            else {
                if (!temps.includes(dog.temperaments))
                    temps.push(dog.temperaments);
            }
            if (!breedGroups.includes(dog.breedGroup))
                breedGroups.push(dog.breedGroup);
        });
        return res.status(200).json({
            temperaments: temps,
            breedGroups,
        });
    }
    catch (error) {
        res
            .status(200)
            .send({ error: error instanceof Error ? error.message : error });
        console.log(error);
    }
});
exports.getTempsAndBreedGroups = getTempsAndBreedGroups;
const likeDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dogId } = req.body;
        const user = req.user;
        const [like, created] = yield Likes_model_1.default.findOrCreate({
            where: { dogId, userId: user === null || user === void 0 ? void 0 : user.id },
            defaults: {
                dogId,
                userId: user === null || user === void 0 ? void 0 : user.id,
            },
        });
        if (!created) {
            yield Likes_model_1.default.destroy({
                where: { dogId, userId: user === null || user === void 0 ? void 0 : user.id },
            });
        }
        const User = yield User_model_1.default.findByPk(user === null || user === void 0 ? void 0 : user.id, {
            include: [
                { model: Dog_model_1.default, as: "likes" },
                { model: Dog_model_1.default, as: "dogs" },
                { model: DogPending_model_1.default, as: "pendingDogs" },
            ],
        });
        if (!User)
            return res.status(404).send("User not found");
        res.json({ User, isFav: created });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ error: error instanceof Error ? error.message : error });
    }
});
exports.likeDog = likeDog;
const createDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.id;
        const multerFile = req.file;
        if (!multerFile)
            return res.status(400).send("Missing data");
        if (yield (0, dogServices_1.hasFourDogs)(userId)) {
            return res.status(403).send("Already have four dogs");
        }
        const createdDog = (0, dogServices_1.validateDog)(req.body);
        const dogWithSameName = yield Dog_model_1.default.findOne({
            where: {
                name: createdDog.name,
            },
        });
        const pendingDogWithSameName = yield DogPending_model_1.default.findOne({
            where: { name: createdDog.name },
        });
        if (dogWithSameName || pendingDogWithSameName) {
            return res.status(409).send("Name already used");
        }
        const imageAsString = multerFile.buffer.toString("base64");
        const result = yield cloudinary_1.v2.uploader.upload(`data:image/png;base64,${imageAsString}`, { public_id: req.body.name.trim() });
        const Dog = Object.assign(Object.assign({}, createdDog), { img: result.url });
        const newDog = yield DogPending_model_1.default.create(Dog);
        res.status(200).send(newDog);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : error });
        console.log(error);
    }
});
exports.createDog = createDog;
const getPendingDogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            res.status(401).send("Missing user data");
        if (!(user === null || user === void 0 ? void 0 : user.admin))
            res.status(401).send("User is not admin");
        const { page, search } = req.query;
        if (!page ||
            isNaN(Number(page)) ||
            search === undefined ||
            search === null) {
            return res.status(400).send("Missing or invalid data");
        }
        let pendingDogs = yield DogPending_model_1.default.findAll({
            include: {
                model: User_model_1.default,
                as: "user",
                attributes: { exclude: ["password", "admin", "id", "email"] },
            },
        });
        if (search.toString() !== "") {
            pendingDogs = pendingDogs.filter((dog) => dog.name.toLowerCase().includes(search.toString().trim().toLowerCase()));
        }
        const itemsPerPage = 4;
        let pagedDogs = [];
        for (let i = 0; i < pendingDogs.length; i += itemsPerPage) {
            const slice = pendingDogs.slice(i, i + itemsPerPage);
            pagedDogs.push(slice);
        }
        res.json({
            totalPages: pagedDogs.length,
            dogs: pagedDogs.length ? pagedDogs[Number(page) - 1] : [],
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : error });
        console.log(error);
    }
});
exports.getPendingDogs = getPendingDogs;
const getPendingDogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const dogId = Number(req.params.id);
        const userId = user === null || user === void 0 ? void 0 : user.id;
        const isAdmin = user === null || user === void 0 ? void 0 : user.admin;
        if (!user || !userId)
            return res.status(401).send("Missing user data");
        if (!dogId)
            res.status(400).json({ error: "Incorrect or missing data" });
        if (!isAdmin) {
            res.status(403);
        }
        const { pendingDog, prevAndNext } = yield (0, dogServices_1.getPendingDog)(dogId);
        res.status(200).json({
            dog: pendingDog,
            prevAndNext,
        });
    }
    catch (error) {
        const status = 500;
        if (error instanceof Error && error.message === "Pending dog not found") {
            status === 404;
        }
        res
            .status(status)
            .json({ error: error instanceof Error ? error.message : error });
        console.log(error);
    }
});
exports.getPendingDogById = getPendingDogById;
const getOwnPendingDogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userId = user === null || user === void 0 ? void 0 : user.id;
        const dogId = Number(req.params.id);
        if (!user || !userId)
            return res.status(401).send("Missing user data");
        if (!dogId)
            res.status(400).send("Incorrect or missing data");
        const { pendingDog, prevAndNext } = yield (0, dogServices_1.getOwnPendingDog)(dogId, userId);
        if (pendingDog.userId !== userId) {
            return res.status(403);
        }
        res.status(200).json({
            dog: pendingDog,
            prevAndNext,
        });
    }
    catch (error) {
        const status = 500;
        if (error instanceof Error && error.message === "Pending dog not found") {
            status === 404;
        }
        res
            .status(status)
            .json({ error: error instanceof Error ? error.message : error });
        console.log(error);
    }
});
exports.getOwnPendingDogById = getOwnPendingDogById;
const approveOrDisapprove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const approve = req.body.approve;
        if (!id || typeof id !== "number" || typeof approve !== "boolean")
            res.status(400).json({ error: "Incorrect or missing data" });
        const pendingDog = yield DogPending_model_1.default.findByPk(id);
        if (!pendingDog) {
            return res.status(404).json({ error: "Pending dog not found" });
        }
        cloudinary_1.v2.uploader.destroy(pendingDog.name);
        pendingDog === null || pendingDog === void 0 ? void 0 : pendingDog.destroy();
        if (!approve)
            return res.status(200).send("Dog disapproved successfully");
        yield Dog_model_1.default.create({
            name: pendingDog.name,
            height: pendingDog.height,
            weight: pendingDog.weight,
            lifeSpan: pendingDog.lifeSpan,
            temperaments: pendingDog.temperaments,
            breedGroup: pendingDog.breedGroup,
            img: pendingDog.img,
            userId: pendingDog.userId,
        });
        res.status(200).send("Dog approved successfully");
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : error });
        console.log(error);
    }
});
exports.approveOrDisapprove = approveOrDisapprove;
const approveOrDisapproveAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const approve = req.body.approve;
        if (!ids || !Array.isArray(ids) || typeof approve !== "boolean")
            res.status(400).json({ error: "Incorrect or missing data" });
        for (let id of ids) {
            if (typeof id !== "number") {
                res.status(400).json({ error: "Incorrect data" });
            }
        }
        const pendingDogs = yield DogPending_model_1.default.findAll({
            where: {
                id: ids,
            },
        });
        pendingDogs.forEach((dog) => {
            cloudinary_1.v2.uploader.destroy(dog.name);
            return dog;
        });
        yield Promise.all(pendingDogs.map((dog) => __awaiter(void 0, void 0, void 0, function* () {
            dog.destroy();
        })));
        yield Dog_model_1.default.bulkCreate(pendingDogs.map((dog) => ({
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            lifeSpan: dog.lifeSpan,
            temperaments: dog.temperaments,
            breedGroup: dog.breedGroup,
            img: dog.img,
            userId: dog.userId,
        })));
        res.status(200).send("Dogs approved successfully");
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : error });
    }
});
exports.approveOrDisapproveAll = approveOrDisapproveAll;
