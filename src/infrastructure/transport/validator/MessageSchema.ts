import { z } from 'zod';

const messageSchema = z.object({
  content: z.string().min(1),
});

export { messageSchema };
