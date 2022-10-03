import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { IUserRequest } from '../../interfaces/User.interface';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: '404|Token not found' });

    const payload = jwt.verify(token, secretKey);
    (req as IUserRequest).user = payload;

    return next();
  } catch (error) {
    return next(error);
  }
};
