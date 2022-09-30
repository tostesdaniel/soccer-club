import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IJwtToken from '../../interfaces/JwtToken.interface';

dotenv.config();

const secretKey = process.env.JWT_TOKEN || 'jwt_secret';

export default function generateJWT(id: number, role: string): IJwtToken {
  const payload = { id, role };
  const options: SignOptions = { algorithm: 'HS256' };

  const token = jwt.sign(payload, secretKey, options);
  return { token };
}
