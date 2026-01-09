export enum QuestionType {
  TEXT = 'text',
  BOOLEAN = 'boolean',
  MULTI = 'multi'
}

export interface MultiAnswer {
  content: string;
  isCorrect: boolean;
}

export interface QuestionContentText {
  id: number;
  content: string;
  questionId: number;
}

export interface QuestionContentBoolean {
  id: number;
  content: string;
  isCorrect: boolean;
  questionId: number;
}

export interface QuestionContentMulti {
  id: number;
  content: string;
  answers: MultiAnswer[];
  questionId: number;
}

export interface Question {
  id: number;
  type: QuestionType;
  userId: number;
  textContent?: QuestionContentText;
  booleanContent?: QuestionContentBoolean;
  multiContent?: QuestionContentMulti;
  createdAt: string;
  updatedAt: string;
}

export interface QuizOwner {
  id: number;
  username: string;
  email: string;
}

export interface Quiz {
  id: number;
  title: string;
  isPrivate: boolean;
  userId: number;
  owner?: QuizOwner;
  questions?: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMultiAnswer {
  content: string;
  isCorrect: boolean;
}

export interface CreateQuestionText {
  type: QuestionType.TEXT;
  content: string;
}

export interface CreateQuestionBoolean {
  type: QuestionType.BOOLEAN;
  content: string;
  isCorrect: boolean;
}

export interface CreateQuestionMulti {
  type: QuestionType.MULTI;
  content: string;
  answers: CreateMultiAnswer[];
}

export type CreateQuestion = CreateQuestionText | CreateQuestionBoolean | CreateQuestionMulti;

export interface CreateQuizPayload {
  title: string;
  isPrivate: boolean;
  questions: CreateQuestion[];
}
