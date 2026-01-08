import { Response } from 'express';
import { RegisterControllerRequest } from '../types/controllers.js';
import { cookieOptions } from '../../../main.js';
import { generateToken } from '../../../lib/utils/jwt.js';
import errorHandler from '../../../lib/utils/error-handler.js';
import registerService from '../services/register-service.js';


async function registerController(req: RegisterControllerRequest, res: Response) {
  try {
    const { username, email, password } = req.body;

    const user = await registerService({ username, email, password });

    const accessToken = generateToken(user);
    const refreshToken = generateToken({ id: user.id }, '7d');

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, cookieOptions);
    
    res.status(200).json({ message: 'Register successful' });
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default registerController;
