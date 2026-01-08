import { z } from 'zod';

const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export default registerSchema;
