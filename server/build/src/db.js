"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Dog_model_1 = __importDefault(require("./models/Dog.model"));
const User_model_1 = __importDefault(require("./models/User.model"));
const Likes_model_1 = __importDefault(require("./models/Likes.model"));
const DogPending_model_1 = __importDefault(require("./models/DogPending.model"));
const conn = new sequelize_typescript_1.Sequelize({
    host: "localhost",
    dialect: "postgres",
    username: "postgres",
    password: 'r61889079',
    database: "dogs",
    logging: false,
    models: [Dog_model_1.default, User_model_1.default, Likes_model_1.default, DogPending_model_1.default]
});
exports.default = conn;
