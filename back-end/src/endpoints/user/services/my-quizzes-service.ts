import Quiz from "../../../models/Quiz.js";

async function getMyQuizzesService(userId: number, page: number, limit: number): Promise<Quiz[]> {

  const quizzes = await Quiz.findAll({
    where: {
      userId: userId,
    },
    offset: (page - 1) * limit,
    limit: limit,
    order: [['createdAt', 'DESC']],
  });

  return quizzes;
}

export default getMyQuizzesService;