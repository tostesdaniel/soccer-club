import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { IUserRequest } from '../../interfaces/User.interface';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export default async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(new Error('400|Token must be provided'));
    }

    const payload = jwt.verify(token, secretKey);
    (req as IUserRequest).user = payload;

    return next();
  } catch (error) {
    return next(new Error('401|Token must be a valid token'));
  }
};
