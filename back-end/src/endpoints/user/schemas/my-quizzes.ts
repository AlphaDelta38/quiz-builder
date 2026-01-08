import { z } from 'zod';

const myQuizzesSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page must be a number').optional().default('1'),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional().default('10'),
  }),
});

export type MyQuizzesSchema = z.infer<typeof myQuizzesSchema>;

export default myQuizzesSchema;