import express from "express";
import conn from "./db";
import userRouter from "./routes/user.routes";
import morgan from "morgan";
import Dog from "./models/Dog.model";
import data from "../data";
import { config } from "dotenv";
import cors from "cors";
import dogRouter from "./routes/dog.routes";
import UserModel from "./models/User.model";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

const server = express();

config();

server.use(cors());
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use("/", userRouter, dogRouter);

const PORT = 3000;

const initialize = async () => {
  try {
    await conn.sync();

    const dogCount = await Dog.count();

    if (dogCount === 0) Dog.bulkCreate(data as any);

    const hashedAdminPWd = await bcrypt.hash(
      process.env.ADMIN_PASSWORD as string,
      10,
    );

    const adminUser = await UserModel.findOne({
      where: {
        username: "admin_user",
      },
    });
    if (!adminUser) {
      await UserModel.create({
        username: "admin_user",
        password: hashedAdminPWd,
        email: "adminuser@gmail.com",
        admin: true,
      });
    }

    cloudinary.config({
      cloud_name: "dev7ozagf",
      api_key: "221169611148754",
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    server.listen(PORT, () => {
      console.log(`Server raised on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
initialize();
