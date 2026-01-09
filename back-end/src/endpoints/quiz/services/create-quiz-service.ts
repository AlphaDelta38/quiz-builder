import { CreateQuizzeServiceRequest } from "../types/services.js";
import Quiz from "../../../models/Quiz.js";
import createQuestion from "./helpers/create-question.js";
import db from "../../../db.js";
import { CustomError } from "../../../lib/utils/error-handler.js";
import Question from "../../../models/Question.js";

async function createQuizService(data: CreateQuizzeServiceRequest, userId: number): Promise<Quiz> {
  const t = await db.transaction();

  const quiz: Quiz = await Quiz.create({ ...data.quiz, userId }, { transaction: t });
  
  const createdQuestions = await Promise.all(
    data.newQuestions.map(q => createQuestion(q, userId, t)
  ));

  const foundExistingQuestions = await Question.findAll({
    where: {
      id: data.questionsIds
    },
    attributes: ['id'],
    transaction: t,
  });

  const existingQuestionIds = foundExistingQuestions.map(q => q.id);

  await quiz.addQuestions(createdQuestions, { transaction: t });
  await quiz.addQuestions(existingQuestionIds, { transaction: t });

  await t.commit();

  const result = await Quiz.findByPk(quiz.id, { include: [{ model: Question, as: 'questions', attributes: ['id'] }] });

  if (!result) {
    throw new CustomError("Quiz not found", 404);
  }

  return result;
}

export default createQuizService;
