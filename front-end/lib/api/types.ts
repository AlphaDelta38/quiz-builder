import { QuestionType } from "@/lib/types/quiz";

export type NewQuestionRequest = {
  questionData: {
    type: QuestionType;
  };
  textContent?: {
    content: string;
  };
  booleanContent?: {
    content: string;
    isCorrect: boolean;
  };
  multiContent?: {
    content: string;
    answers: {
      content: string;
      isCorrect: boolean;
    }[];
  };
};

export type CreateQuizRequest = {
  quiz: {
    title: string;
    isPrivate?: boolean;
  };
  newQuestions: NewQuestionRequest[];
  questionsIds: number[];
};

export type FetchQuizzesParams = {
  page?: number;
  limit?: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

