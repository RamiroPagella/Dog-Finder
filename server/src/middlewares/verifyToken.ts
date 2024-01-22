import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IdUser, PwdUser, User } from '../types/user.types';


interface CustomRequest extends Request {
  user?: IdUser
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.header("Authorization");
    if (!token) return res.status(401).json({message: 'Missing token'});

    const secretKey: string = process.env.SECRET as string

    const user: IdUser = jwt.verify(token, secretKey) as IdUser;
    req.user = user;

    next();    

  } catch (error) {

    if (error instanceof Error) {
      const err = {error: error.name, message: error.message}
      console.log(err)
      res.status(401).json(err);
    }
    
  }
}
