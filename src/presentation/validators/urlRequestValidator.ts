import { z } from 'zod';

export const createShortUrlSchema = z.object({
  originalUrl: z.string().url('Invalid URL format')
});
