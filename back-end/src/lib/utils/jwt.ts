import jwt, { SignOptions } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret';

interface TokenPayload {
  id: number;
  username: string;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as SignOptions['expiresIn']
  });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as TokenPayload;
  } catch (e) {
    return null;
  }
};
