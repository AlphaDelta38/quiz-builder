import { Response } from 'express';
import { LoginControllerRequest } from '../types/controllers.js';
import loginService from '../services/login-service.js';
import { cookieOptions } from '../../../main.js';
import { generateToken } from '../../../lib/utils/jwt.js';
import errorHandler from '../../../lib/utils/error-handler.js';


async function loginController(req: LoginControllerRequest, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await loginService({ email, password });

    const accessToken = generateToken(user);
    const refreshToken = generateToken({ id: user.id }, '7d');

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, cookieOptions);
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default loginController;
