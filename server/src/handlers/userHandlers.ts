import { RequestHandler } from "express";
import {
  findUser,
  generateToken,
  registerUser,
  validateUser,
} from "../services/userServices";
import { User } from "../types/user.types";

export const Register: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const User: Omit<User, "password"> = await registerUser(
      validateUser({
        username,
        email,
        password,
      })
    );

    const token = generateToken({ username, email });

    return res.status(201).json({ authenticated: true, token, User });
  } catch (error) {
    let status: number = 500;
    let errorMsg: string = '';
    
    if (error instanceof Error) {
      const { message } = error;
      if (message === 'Email already in use') status = 409
      //falta if (message === 'Error encrypting password'), porque en ese caso staatus seguiria siendo 500
      errorMsg = error.message
    }

    res.status(status).json({
      message: errorMsg,
      authenticated: false
    })
  }
};

export const Login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User: Omit<User, "password"> = await findUser({ email, password });

    const token = generateToken(User);

    res.status(201).json({ authenticated: true, token: token, user: User });

  } catch (error) {
    console.log(error);
    let status: number = 500;
    let errorMsg: string = '';

    if (error instanceof Error) {
      const { message } = error;
      if (message === "User not found") status = 404;
      if (message === "Incorrect password") status = 401;
      errorMsg = message
    }

    res.status(status).json({
      authenticated: false,
      message: errorMsg
    })
  }
};
