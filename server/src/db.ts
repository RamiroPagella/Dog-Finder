import { Sequelize } from 'sequelize-typescript';
import DogModel from './models/Dog.model';
import UserModel from './models/User.model';
import LikesModel from './models/Likes.model';


const conn = new Sequelize({
  host: "localhost",
  dialect: "postgres",
  username: "postgres",
  password: 'r61889079',
  database: "dogs",
  logging: false,
  models: [DogModel, UserModel, LikesModel]
})

export default conn;