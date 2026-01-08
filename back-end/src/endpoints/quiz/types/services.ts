import { 
  QuestionAttributes, 
  QuizAttributes,
  QuestionContentTextAttributes,
  QuestionContentBooleanAttributes,
  QuestionContentMultiAttributes,
} from "../../../lib/types/models.js";


type NewQuestion = {
  questionData: Omit<QuestionAttributes, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
  textContent?: Omit<QuestionContentTextAttributes, 'id' | 'questionId'>;
  booleanContent?: Omit<QuestionContentBooleanAttributes, 'id' | 'questionId'>;
  multiContent?: Omit<QuestionContentMultiAttributes, 'id' | 'questionId'>;
};

interface CreateQuizzeServiceRequest {
  quiz: Omit<QuizAttributes, 'id' | 'createdAt' | 'updatedAt'>;
  newQuestions: NewQuestion[];
  questionsIds: number[];
}

export type {
  CreateQuizzeServiceRequest,
  NewQuestion,
}