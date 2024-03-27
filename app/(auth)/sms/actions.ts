'use server';

import { z } from 'zod';
import validator from 'validator';
import { ActionState } from '@/app/(auth)/sms/types';
import {
  doesTokenExists,
  loginWithSMS,
  validChkWithSMS,
} from '@/app/(auth)/sms/services';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    '유효하지 않은 전화번호입니다.',
  );

const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(doesTokenExists, '존재하지 않는 토큰입니다.');

export const smsLogIn = async (
  prevState: ActionState,
  formData: FormData,
): Promise<any> => {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!prevState.token) {
    const phoneValid = phoneSchema.safeParse(phone);
    return !phoneValid.success
      ? { token: false, error: phoneValid.error.flatten() }
      : await validChkWithSMS(phoneValid.data);
  } else {
    const tokenValid = await tokenSchema.spa(token);
    if (!tokenValid.success) {
      return { token: !tokenValid.success, error: tokenValid.error.flatten() };
    } else await loginWithSMS(tokenValid.data.toString());
  }
};
