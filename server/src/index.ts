import express from "express";
import conn from "./db";
import userRouter from "./routes/user.routes";
import morgan from "morgan";
import Dog from "./models/Dog.model";
import data from "../data";
import { config } from "dotenv";
import cors from 'cors';
import dogRouter from "./routes/dog.routes";

const server = express();

config();

server.use(cors())
server.use(morgan("dev"));
server.use(express.urlencoded({extended: false}))
server.use(express.json());
server.use("/", userRouter, dogRouter);



const PORT = 3000;

conn
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server raised on port ${PORT}`);
    });

    Dog.count().then((count) => {
      if (count === 0) {
        Dog.bulkCreate(data)
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
