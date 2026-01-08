import { z } from 'zod';
import { QuestionType } from '../../../models/Question.js';

const questionContentTextSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

const questionContentBooleanSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  isCorrect: z.boolean(),
});

const answerSchema = z.object({
  content: z.string().min(1, 'Answer content is required'),
  isCorrect: z.boolean(),
});

const questionContentMultiSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  answers: z.array(answerSchema).min(2, 'At least 2 answers required'),
});

const newQuestionSchema = z.object({
  questionData: z.object({
    type: z.enum([QuestionType.TEXT, QuestionType.BOOLEAN, QuestionType.MULTI]),
  }),
  textContent: questionContentTextSchema.optional(),
  booleanContent: questionContentBooleanSchema.optional(),
  multiContent: questionContentMultiSchema.optional(),
});

const createQuizSchema = z.object({
  body: z.object({
    quiz: z.object({
      title: z.string().min(1, 'Title is required'),
      isPrivate: z.boolean().optional().default(false),
    }),
    newQuestions: z.array(newQuestionSchema).optional().default([]),
    questionsIds: z.array(z.number().int().positive()).optional().default([]),
  }),
});

export type CreateQuizSchema = z.infer<typeof createQuizSchema>;

export default createQuizSchema;
