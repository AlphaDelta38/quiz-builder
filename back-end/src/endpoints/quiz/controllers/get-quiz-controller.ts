import { Response } from "express";
import errorHandler, { CustomError } from "../../../lib/utils/error-handler.js";
import getQuizService from "../services/get-quiz-service.js";
import { GetQuizControllerRequest } from "../types/controllers.js";


async function getQuizController(req: GetQuizControllerRequest, res: Response): Promise<void> {
  try {
    
    if (!req.user?.id) {
      throw new CustomError("User id is required", 400);
    }

    const quiz = await getQuizService(req.params.id, req.user.id);
    res.status(200).json(quiz);
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default getQuizController;
