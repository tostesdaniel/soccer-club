import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserPayload extends JwtPayload, Request {
  user: {
    id: number;
    role: string;
  };
}

export interface IUserRequest extends Request {
  user: string | JwtPayload;
}
