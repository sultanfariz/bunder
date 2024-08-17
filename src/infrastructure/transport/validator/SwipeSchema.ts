import { z } from 'zod';

const swipeSchema = z.object({
  swipeDirection: z.enum(['LEFT', 'RIGHT']),
});

export { swipeSchema };
