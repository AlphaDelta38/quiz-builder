import { z } from 'zod';

const getAllQuizzesSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page must be a number').optional().default('1'),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional().default('10'),
  }),
});

export type GetAllQuizzesSchema = z.infer<typeof getAllQuizzesSchema>;

export default getAllQuizzesSchema;