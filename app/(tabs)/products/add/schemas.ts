import { z } from 'zod';
import { INVALID } from '@/libs/constants';

export const productScheme = z.object({
  photo: z.string({ required_error: '사진이 필요합니다.' }),
  title: z
    .string({ required_error: '제목이 필요합니다.' })
    .min(10, INVALID.TOO_SHORT)
    .max(50, INVALID.TOO_LONG),
  description: z
    .string({ required_error: '자세한 설명이 필요합니다.' })
    .min(10, INVALID.TOO_SHORT)
    .max(300, INVALID.TOO_LONG),
  price: z.coerce
    .number({
      required_error: '가격이 필요합니다.',
      invalid_type_error: '숫자를 입력해주세요.',
    })
    .min(100, '최소 100원 이상이어야 합니다.'),
});

export type ProductType = z.infer<typeof productScheme>;
