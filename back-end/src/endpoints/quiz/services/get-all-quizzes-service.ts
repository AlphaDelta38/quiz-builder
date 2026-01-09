import Question from "../../../models/Question.js";
import Quiz from "../../../models/Quiz.js";

async function getAllQuizzesService(page: number, limit: number): Promise<Quiz[]> {
  const quizzes = await Quiz.findAll({
    where: {
      isPrivate: false,
    },
    attributes: ['id', 'title', 'createdAt', 'updatedAt'],
    offset: (page - 1) * limit,
    limit: limit,
    include: [{ model: Question, as: 'questions', attributes: ['id'] }],
    order: [['createdAt', 'DESC']],
  });

  
  return quizzes;
}

export default getAllQuizzesService;
