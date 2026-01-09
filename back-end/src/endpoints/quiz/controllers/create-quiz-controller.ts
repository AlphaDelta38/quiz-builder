import { Response } from 'express';
import errorHandler, { CustomError } from '../../../lib/utils/error-handler.js';
import { CreateQuizzeControllerRequest } from '../types/controllers.js';
import createQuizzeService from '../services/create-quiz-service.js';


async function createQuizController(req: CreateQuizzeControllerRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new CustomError("User id is required", 400);
    }

    const quizze = await createQuizzeService(req.body, userId);

    res.status(200).json(quizze);
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default createQuizController;
