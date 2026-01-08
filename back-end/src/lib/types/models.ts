import User from '../../models/User.js';
import Quiz from '../../models/Quiz.js';
import Question from '../../models/Question.js';
import QuestionContentText from '../../models/QuestionContentText.js';
import QuestionContentBoolean from '../../models/QuestionContentBoolean.js';
import QuestionContentMulti from '../../models/QuestionContentMulti.js';
import { InferAttributes } from 'sequelize';

type UserAttibutes = InferAttributes<User>;
type QuizAttributes = InferAttributes<Quiz>;
type QuestionAttributes = InferAttributes<Question>;
type QuestionContentTextAttributes = InferAttributes<QuestionContentText>;
type QuestionContentBooleanAttributes = InferAttributes<QuestionContentBoolean>;
type QuestionContentMultiAttributes = InferAttributes<QuestionContentMulti>;

export type { 
  UserAttibutes, 
  QuizAttributes, 
  QuestionAttributes,
  QuestionContentTextAttributes,
  QuestionContentBooleanAttributes,
  QuestionContentMultiAttributes,
};
