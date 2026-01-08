import { z } from 'zod';

const deleteQuizSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number'),
  }),
});

export type DeleteQuizSchema = z.infer<typeof deleteQuizSchema>;

export default deleteQuizSchema;