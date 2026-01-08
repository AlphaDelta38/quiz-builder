import { Transaction } from "sequelize";
import { QuestionContentBooleanAttributes, QuestionContentMultiAttributes, QuestionContentTextAttributes } from "../../../../lib/types/models.js";
import { CustomError } from "../../../../lib/utils/error-handler.js";
import Question, { QuestionType } from "../../../../models/Question.js";
import QuestionContentBoolean from "../../../../models/QuestionContentBoolean.js";
import QuestionContentMulti from "../../../../models/QuestionContentMulti.js";
import QuestionContentText from "../../../../models/QuestionContentText.js";
import { NewQuestion } from "../../types/services.js";

type ContentData = 
  | Omit<QuestionContentTextAttributes, 'id' | 'questionId'>
  | Omit<QuestionContentBooleanAttributes, 'id' | 'questionId'>
  | Omit<QuestionContentMultiAttributes, 'id' | 'questionId'>;

const createQuestionContent = async (
  type: QuestionType, 
  questionId: number, 
  data: ContentData,
  transaction: Transaction
) => {
  switch (type) {
    case QuestionType.TEXT:
      return QuestionContentText.create({ ...data, questionId } as any, { transaction });
    case QuestionType.BOOLEAN:
      return QuestionContentBoolean.create({ ...data, questionId } as any, { transaction });
    case QuestionType.MULTI:
      return QuestionContentMulti.create({ ...data, questionId } as any, { transaction });
  }
};

const contentKeyMap: Record<QuestionType, keyof Omit<NewQuestion, 'questionData'>> = {
  [QuestionType.TEXT]: "textContent",
  [QuestionType.BOOLEAN]: "booleanContent",
  [QuestionType.MULTI]: "multiContent",
};

async function createQuestion(questionData: NewQuestion, transaction: Transaction ): Promise<Question> {
  const { questionData: qData } = questionData;
  
  const question = await Question.create(qData, { transaction });

  const contentKey = contentKeyMap[qData.type];
  const contentData = questionData[contentKey];

  if (!contentData) {
    throw new CustomError("Question content is required", 400);
  }

  await createQuestionContent(qData.type, question.id, contentData, transaction);
  
  return question;
}

export default createQuestion;
