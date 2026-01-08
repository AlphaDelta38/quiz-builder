import { Request, Response } from "express";

import errorHandler, { CustomError } from "../../../lib/utils/error-handler.js";
import deleteQuizService from "../services/delete-quiz-service.js";

async function deleteQuizController(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user?.id) {
      throw new CustomError("User id is required", 400);
    }

    await deleteQuizService(req.params.id, req.user.id);

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    errorHandler(error as Error, res);
  }
}

export default deleteQuizController;
