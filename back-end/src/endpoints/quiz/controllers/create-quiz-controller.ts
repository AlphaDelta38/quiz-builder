import { Response } from 'express';
import errorHandler from '../../../lib/utils/error-handler.js';
import { CreateQuizzeControllerRequest } from '../types/controllers.js';
import createQuizzeService from '../services/create-quiz-service.js';


async function createQuizController(req: CreateQuizzeControllerRequest, res: Response): Promise<void> {
  try {
    const quizze = await createQuizzeService(req.body);

    res.status(200).json(quizze);
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default createQuizController;
