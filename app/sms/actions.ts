'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';
import { ActionState } from '@/app/sms/types';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    '유효하지 않은 전화번호입니다.',
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

export const smsLogIn = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get('phone');
  const token = formData.get('token');
  const phoneValid = phoneSchema.safeParse(phone);
  const tokenValid = tokenSchema.safeParse(token);

  if (!prevState.token) {
    return {
      token: phoneValid.success,
      error: !phoneValid.success ? phoneValid.error.flatten() : undefined,
    };
  } else {
    if (!tokenValid.success) {
      return { token: !tokenValid.success, error: tokenValid.error.flatten() };
    } else redirect('/'); // Todo: 로그인 성공 직후 페이지로 변경
  }
};
