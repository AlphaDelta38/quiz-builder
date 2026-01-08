import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { UserAuthType } from '../types/auth.js';
import 'dotenv/config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const userData: UserAuthType | null = verifyToken<UserAuthType>(accessToken);

    if (!userData) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = userData;

    next();

  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
