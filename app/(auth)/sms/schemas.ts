import { z } from 'zod';
import validator from 'validator';
import { doesTokenExists } from '@/app/(auth)/sms/services';

export const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    '유효하지 않은 전화번호입니다.',
  );

export const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(doesTokenExists, '존재하지 않는 토큰입니다.');
