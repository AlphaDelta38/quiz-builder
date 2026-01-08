import User from '../../models/User.js';
import Quizze from '../../models/Quizze.js';
import Question from '../../models/Question.js';
import QuestionContentText from '../../models/QuestionContentText.js';
import { InferAttributes } from 'sequelize';

type UserType = InferAttributes<User>;
type QuizType = InferAttributes<Quizze>;
type QuestionType = InferAttributes<Question>;
type QuestionContentTypeText = InferAttributes<QuestionContentText>;

export type { 
  UserType, 
  QuizType, 
  QuestionType,
  QuestionContentTypeText,
};
