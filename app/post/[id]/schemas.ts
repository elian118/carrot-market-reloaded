import { z } from 'zod';
import { INVALID } from '@/libs/constants';

export const commentScheme = z.object({
  payload: z
    .string({
      required_error: `댓글을 ${INVALID.INPUT}`,
    })
    .trim()
    .min(1, INVALID.TOO_SHORT)
    .max(100, INVALID.TOO_LONG),
});

export type CommentType = z.infer<typeof commentScheme>;
