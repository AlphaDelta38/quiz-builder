import { Request, Response } from 'express';
import errorHandler from '../../../lib/utils/error-handler.js';


async function logoutController(_: Request, res: Response) {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default logoutController;
