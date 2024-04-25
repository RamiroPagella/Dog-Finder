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
exports.generateToken = exports.LogUser = exports.registerUser = exports.validateUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const Dog_model_1 = __importDefault(require("../models/Dog.model"));
const validateUser = (user) => {
    const { email, username, password } = user;
    if (!email || !username || !password)
        throw new Error("Missing data");
    const validations = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email),
        username: username !== "",
        password: password.length >= 6,
    };
    if (!validations.email || !validations.username || !validations.password)
        throw new Error("Invalid data");
    return user;
};
exports.validateUser = validateUser;
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPwd = yield bcryptjs_1.default.hash(user.password, 10);
        const newUser = {
            username: user.username,
            email: user.email,
            password: hashedPwd,
            admin: false,
        };
        const [User, created] = yield User_model_1.default.findOrCreate({
            attributes: {
                exclude: ["password"],
            },
            where: { email: user.email },
            defaults: newUser,
        });
        if (!created) {
            throw new Error("Email already in use");
        }
        //user without password
        return {
            username: User.username,
            email: User.email,
            id: User.id,
            admin: false,
            likes: []
        };
    }
    catch (error) {
        console.log(error);
        throw new Error(error instanceof Error ? error.message : undefined);
    }
});
exports.registerUser = registerUser;
const LogUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = user;
    const User = yield User_model_1.default.findOne({
        where: {
            email: {
                [sequelize_1.Op.iLike]: email,
            },
        },
        include: { model: Dog_model_1.default, as: "likes" },
    });
    if (!User)
        throw new Error("User not found");
    const isPwdCorrect = yield bcryptjs_1.default.compare(password, User.password);
    if (!isPwdCorrect)
        throw new Error("Incorrect password");
    const userWithId = {
        username: User.username,
        email: User.email,
        id: User.id,
        likes: User.likes,
        admin: User.admin,
    };
    return userWithId;
});
exports.LogUser = LogUser;
const generateToken = (info) => {
    const secretKey = process.env.SECRET;
    const token = jsonwebtoken_1.default.sign(info, secretKey, { expiresIn: "1d" });
    return token;
};
exports.generateToken = generateToken;
