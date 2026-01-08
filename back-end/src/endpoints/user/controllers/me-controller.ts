import { Request, Response } from 'express';
import errorHandler, { CustomError } from '../../../lib/utils/error-handler.js';
import meService from '../services/me-service.js';
import { MeControllerRequest } from '../types/controller.js';


async function meController(req: Request, res: Response): Promise<void> {
  try {
    const typedReq = req as unknown as MeControllerRequest;
    const accessToken = typedReq.cookies.accessToken;

    if (!accessToken) {
      throw new CustomError('Access token is required', 400);
    }

    const user = await meService(accessToken);

    res.status(200).json({ user });
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default meController;
