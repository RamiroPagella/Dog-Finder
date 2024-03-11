import { Request, RequestHandler } from "express";
import {
  LogUser,
  generateToken,
  registerUser,
  validateUser,
} from "../services/userServices";
import { User, IdUser, PwdUser } from "../types/user.types";
import UserModel from "../models/User.model";
import DogModel from "../models/Dog.model";

export const Register: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const User: IdUser = await registerUser(
      validateUser({
        username,
        email,
        password,
      }),
    );

    const token = generateToken({
      id: User.id,
      admin: User.admin,
    });

    return res.status(201).json({ authenticated: true, token, User });
  } catch (error) {
    let status: number = 500;
    let errorMsg: string = "";

    if (error instanceof Error) {
      const { message } = error;
      if (message === "Email already in use") status = 409;
      //falta if (message === 'Error encrypting password'), porque en ese caso status seguiria siendo 500
      errorMsg = error.message;
    }

    res.status(status).json({
      message: errorMsg,
      authenticated: false,
    });
  }
};

export const Login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User: IdUser = await LogUser({ email, password });

    const userInfoToToken = { id: User.id, admin: User.admin };

    const token = generateToken(userInfoToToken);

    res.status(201).json({ authenticated: true, token: token, user: User });
  } catch (error) {
    console.log(error);
    let status: number = 500;
    let errorMsg: string = "";

    if (error instanceof Error) {
      if (error.message === "User not found") status = 404;
      if (error.message === "Incorrect password") status = 401;
      errorMsg = error.message;
    }

    res.status(status).json({
      authenticated: false,
      error: error instanceof Error ? error.name : error,
      message: errorMsg,
    });
  }
};

interface CustomRequest extends Request {
  user?: IdUser;
}
export const UserInfo: RequestHandler = async (req: CustomRequest, res) => {
  try {
    const user: IdUser | undefined = req.user;
    if (!user) res.status(401);

    const User = await UserModel.findByPk(user?.id, {
      include: { model: DogModel, as: "likes" },
    });

    const UserWithowtPswd = {
      username: User?.username,
      email: User?.email,
      id: User?.id,
      likes: User?.likes,
      admin: User?.admin,
    };

    return res.status(200).json(UserWithowtPswd);
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(500)
        .json({ error: error.name, message: error.message });
    res.status(500);
  }
};
