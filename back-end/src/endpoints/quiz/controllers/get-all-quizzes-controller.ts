import { Response } from "express";
import { GetAllQuizzesControllerRequest } from "../types/controllers.js";
import errorHandler from "../../../lib/utils/error-handler.js";
import getAllQuizzesService from "../services/get-all-quizzes-service.js";

async function getAllQuizzesController(req: GetAllQuizzesControllerRequest, res: Response): Promise<void> {
  try {
    const { page = 1, limit = 10 } = req.query;

    const quizzes = await getAllQuizzesService(Number(page), Number(limit));

    res.status(200).json(quizzes);
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default getAllQuizzesController;
