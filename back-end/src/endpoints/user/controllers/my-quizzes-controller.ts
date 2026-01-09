import { Request, Response } from "express";
import errorHandler, { CustomError } from "../../../lib/utils/error-handler.js";
import getMyQuizzesService from "../services/my-quizzes-service.js";

async function getMyQuizzesController(req: Request, res: Response): Promise<void> {
  try {
    const { query } = res.locals.validated; 
    
    if (!req.user?.id) {
      throw new CustomError('User id is required', 400);
    }
    
    const quizzes = await getMyQuizzesService(req.user.id, Number(query.page), Number(query.limit));

    res.status(200).json(quizzes);
  } catch (error) {
    errorHandler(error as Error, res);
    
  }
}

export default getMyQuizzesController;