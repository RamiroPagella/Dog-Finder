import { User } from "../types/user.types";
import UserModel from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const validateUser = (user: unknown): User => {
  const { email, username, password } = user as User;
  if (!email || !username || !password) throw new Error("Missing data");

  const validations = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email),
    username: username !== "",
    password: password.length >= 6,
  };
  if (!validations.email || !validations.username || !validations.password)
    throw new Error("Invalid data");

  return user as User;
};

export const registerUser = async (user: User): Promise<Omit<User, "password">> => {
  try {
    const hashedPwd = await bcrypt.hash(user.password, 10);
    user.password = hashedPwd;

    const [User, created]: [User, boolean] = await UserModel.findOrCreate({
      where: { email: user.email },
      defaults: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });

    if (!created) {
      throw new Error("Email already in use");
    }

    return {
      username: User.username,
      email: User.email,
      id: User.id,
    };
  } catch (error) {
    console.log(error)
    throw new Error(error instanceof Error ? error.message : undefined);
  }
};

export const findUser = async (
  user: Omit<User, "username">
): Promise<Omit<User, "password">> => {
  const { email, password } = user;

  const User: User | null = await UserModel.findOne({
    where: {
      email: {
        [Op.iLike]: email,
      },
    },
  });

  if (!User) throw new Error("User not found");

  const isPwdCorrect = await bcrypt.compare(password, User.password);

  if (!isPwdCorrect) throw new Error("Incorrect password");

  return {
    username: User.username,
    email: User.email,
    id: User.id,
  };
};

export const generateToken = (user: Omit<User, "password">) => {
  const secretKey = process.env.SECRET as string;
  const token = jwt.sign(user, secretKey, { expiresIn: "1d" });
  console.log(token);
  return token;
};
