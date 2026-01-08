import { z } from 'zod';

const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default loginSchema;
