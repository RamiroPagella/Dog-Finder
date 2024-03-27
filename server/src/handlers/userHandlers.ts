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
import DogPendingModel from "../models/DogPending.model";
import bcrypt from "bcryptjs";

interface ReqWithUser extends Request {
  user?: IdUser;
}

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

    console.log(User);

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

    res.status(201).json({ authenticated: true, token: token, User });
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

export const UserInfo: RequestHandler = async (req: ReqWithUser, res) => {
  try {
    const user: IdUser | undefined = req.user;
    if (!user) res.status(401);

    const User = await UserModel.findByPk(user?.id, {
      include: [
        { model: DogModel, as: "likes" },
        { model: DogModel, as: "dogs" },
        { model: DogPendingModel, as: "pendingDogs" },
      ],
      attributes: {
        exclude: ["password"],
      },
    });
    if (!User) return res.status(400).send("User not found");

    return res.status(200).json(User);
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(500)
        .json({ error: error.name, message: error.message });
    res.status(500);
  }
};

export const changePassword: RequestHandler = async (req: ReqWithUser, res) => {
  try {
    const { actualPwd, newPwd } = req.body;
    const userId = req.user?.id;
    
    if (!actualPwd || actualPwd === "" || !newPwd || newPwd === "") {
      return res.status(400).send("Incorrect or missing data");
    }

    const User = await UserModel.findByPk(userId);
    if (!User) return res.status(400).send("User not found");

    const isPwdCorrect = await bcrypt.compare(actualPwd, User.password);

    if (!isPwdCorrect) {
      return res.status(403).send("Incorrect password");
    }

    const hashedPwd = await bcrypt.hash(newPwd, 10);

    await User.update(
      { password: hashedPwd },
      {
        where: {
          id: userId,
        },
      },
    );

    res.status(200).send("Password changed succesfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};
