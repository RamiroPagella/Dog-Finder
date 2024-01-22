import { IdUser, PwdUser, User } from "../types/user.types";
import UserModel from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const validateUser = (user: PwdUser): PwdUser => {
  const { email, username, password } = user;
  if (!email || !username || !password) throw new Error("Missing data");

  const validations = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email),
    username: username !== "",
    password: password.length >= 6,
  };
  if (!validations.email || !validations.username || !validations.password)
    throw new Error("Invalid data");

  return user;
};

export const registerUser = async (user: PwdUser): Promise<IdUser> => {
  try {
    const hashedPwd = await bcrypt.hash(user.password, 10);
    
    const newUser: PwdUser = {
      username: user.username,
      email: user.email,
      password: hashedPwd
    }

    const [User, created]: [IdUser, boolean] = await UserModel.findOrCreate({
      where: { email: user.email },
      defaults: newUser,
    });

    if (!created) {
      throw new Error("Email already in use");
    }

    return User;
  } catch (error) {
    console.log(error)
    throw new Error(error instanceof Error ? error.message : undefined);
  }
};

export const LogUser = async (
  user: Omit<PwdUser, 'username'>
): Promise<IdUser> => {
  const { email, password } = user;

  const User: User | null = await UserModel.findOne({
    where: {
      email: {
        [Op.iLike]: email,
      },
    },
  });

  if (!User) throw new Error("User not found");

  const isPwdCorrect: boolean = await bcrypt.compare(password, User.password);

  if (!isPwdCorrect) throw new Error("Incorrect password");

  const userWithId = {
    username: User.username,
    email: User.email,
    id: User.id
  }

  return userWithId;
};

export const generateToken = (user: IdUser) => {
  const secretKey = process.env.SECRET as string;
  const token = jwt.sign(user, secretKey, { expiresIn: "1d" });
  return token;
};
