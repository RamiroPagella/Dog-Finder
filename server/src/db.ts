import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import DogModel from "./models/Dog.model";
import UserModel from "./models/User.model";
import LikesModel from "./models/Likes.model";
import DogPendingModel from "./models/DogPending.model";

config();

// const conn = new Sequelize({
//   host: "localhost",
//   dialect: "postgres",
//   username: "postgres",
//   password: 'r61889079',
//   database: "dogs",
//   logging: false,
//   models: [DogModel, UserModel, LikesModel, DogPendingModel]
// })

const conn = new Sequelize({
  host: process.env.DB_HOST,
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "dog_finder_database",
  logging: false,
  models: [DogModel, UserModel, LikesModel, DogPendingModel],
});

export default conn;
