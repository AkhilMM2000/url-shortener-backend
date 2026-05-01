import { z } from 'zod';

export const registerRequestSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .refine((email) => !email.endsWith('.cm'), {
      message: 'Did you mean .com? (.cm is usually a typo)',
    }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
