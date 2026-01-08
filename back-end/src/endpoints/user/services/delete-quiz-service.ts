import { CustomError } from "../../../lib/utils/error-handler.js";
import Quiz from "../../../models/Quiz.js";

async function deleteQuizService(id: string, userId: number): Promise<void> {
  const quiz = await Quiz.findOne({ where: { id, userId } });

  if (!quiz) {
    throw new CustomError("Quiz not found", 404);
  }
  
  await quiz.destroy();
}

export default deleteQuizService;
