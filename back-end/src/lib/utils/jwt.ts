import jwt, { SignOptions } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret';

export function generateToken<T extends object>(
  payload: T, 
  expiresIn: SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN || '24h') as SignOptions['expiresIn']
): string {
  const parsedPayload = JSON.parse(JSON.stringify(payload));
  return jwt.sign(parsedPayload, SECRET_KEY, { expiresIn });
}

export function verifyToken<T extends object>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET_KEY) as T;
  } catch (e) {
    return null;
  }
};
