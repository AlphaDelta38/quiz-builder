import User from '../../models/User.js';
import Quizze from '../../models/Quizze.js';
import Question from '../../models/Question.js';
import QuestionContentText from '../../models/QuestionContentText.js';
import { InferCreationAttributes } from 'sequelize';

type UserType = InferCreationAttributes<User>;
type QuizType = InferCreationAttributes<Quizze>;
type QuestionType = InferCreationAttributes<Question>;
type QuestionContentTypeText = InferCreationAttributes<QuestionContentText>;

export type { 
  UserType, 
  QuizType, 
  QuestionType,
  QuestionContentTypeText,
};
