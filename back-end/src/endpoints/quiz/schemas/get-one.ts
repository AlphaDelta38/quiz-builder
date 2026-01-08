import { z } from 'zod';

const getQuizSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number'),
  }),
});

export type GetQuizSchema = z.infer<typeof getQuizSchema>;

export default getQuizSchema;
