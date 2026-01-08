import {Request, Response } from 'express';
import { RefreshControllerRequest } from '../types/controllers.js';
import { cookieOptions } from '../../../main.js';
import { generateToken } from '../../../lib/utils/jwt.js';
import errorHandler, { CustomError } from '../../../lib/utils/error-handler.js';
import refreshService from '../services/refresh-service.js';


async function refreshController(req:  Request, res: Response) {
  try {
    const typedReq = req as unknown as RefreshControllerRequest;
    const refreshToken = typedReq.cookies.refreshToken;

    if (!refreshToken) {
      throw new CustomError('Refresh token is required', 400);
    }

    const user = await refreshService(refreshToken);
    const accessToken = generateToken(user);

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 10 * 60 * 1000 });
    
    res.status(200).json({ message: 'Refresh successful' });
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default refreshController;
