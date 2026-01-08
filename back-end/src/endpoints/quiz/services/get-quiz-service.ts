import { CustomError } from "../../../lib/utils/error-handler.js";
import Quiz from "../../../models/Quiz.js";

async function getQuizService(id: string, userId: number): Promise<Quiz> {

  const quiz = await Quiz.findByPk(id, { include: ['questions', 'owner'] });
  
  if (!quiz) {
    throw new CustomError("Quiz not found", 404);
  }

  if (quiz.isPrivate && quiz.owner?.id !== userId) {
    throw new CustomError("You are not the owner of this quiz", 403);
  }

  return quiz;
}

export default getQuizService;
