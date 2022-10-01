import { ValidationError } from 'joi';
import IJwtToken from '../interfaces/JwtToken.interface';
import ILogin from '../interfaces/Login.interface';
import User from '../database/models/UserModel';
import generateJWT from '../utils/auth/generateJWT';
import loginSchema from '../validations/login.schema';

export default class UserService {
  constructor(private _userModel: typeof User) {}

  async login(user: ILogin): Promise<IJwtToken | ValidationError> {
    const { error } = loginSchema.login.validate(user);
    if (error) throw new Error(error.details[0].message);

    const instance = await this._userModel.findOne({
      where: { email: user.email },
    });
    if (!instance) {
      throw new Error('401|Incorrect email or password');
    }

    const token = generateJWT(instance.id, instance.role);

    return token;
  }
}
