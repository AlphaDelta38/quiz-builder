import { CustomError } from "../../../lib/utils/error-handler.js";
import Question from "../../../models/Question.js";
import Quiz from "../../../models/Quiz.js";
import User from "../../../models/User.js";

async function getQuizService(id: string, userId: number): Promise<Quiz> {

  const quiz = await Quiz.findByPk(id, { include: [
    { model: Question, as: 'questions' , include: [{all: true, nested: true}]}, 
    { model: User, as: 'owner', attributes: ['id', 'username', 'email'] }
  ] });
  
  if (!quiz) {
    throw new CustomError("Quiz not found", 404);
  }

  if (quiz.isPrivate && quiz.owner?.id !== userId) {
    throw new CustomError("You are not the owner of this quiz", 403);
  }

  return quiz;
}

export default getQuizService;
