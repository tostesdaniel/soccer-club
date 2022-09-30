import IJwtToken from '../interfaces/JwtToken.interface';
import ILogin from '../interfaces/Login.interface';
import User from '../database/models/UserModel';
import generateJWT from '../utils/auth/generateJWT';

export default class UserService {
  constructor(private _userModel: typeof User) {}

  async login(user: ILogin): Promise<IJwtToken> {
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
