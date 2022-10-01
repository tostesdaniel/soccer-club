import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/User.interface';
import UserService from '../services/User.service';

export default class UserController {
  constructor(private _userService: UserService) {}

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const user = req.body as IUser;
    try {
      const token = await this._userService.login(user);
      return res.status(200).json(token);
    } catch (error) {
      return next(error);
    }
  }

  static async validateLogin(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: '404|token not found' });

    const userRole = await UserService.validateLogin(token);

    return res.status(200).json(userRole);
  }
}
