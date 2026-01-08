import Question from "../../../models/Question.js";
import Quiz from "../../../models/Quiz.js";

async function getAllQuizzesService(page: number, limit: number): Promise<Quiz[]> {
  const quizzes = await Quiz.findAll({
    where: {
      isPrivate: false,
    },
    attributes: ['id', 'title'],
    offset: (page - 1) * limit,
    limit: limit,
    include: [{ model: Question, attributes: ['id'] }],
    order: [['createdAt', 'DESC']],
  });

  
  return quizzes;
}

export default getAllQuizzesService;
