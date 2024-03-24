'use server';

import { z } from 'zod';
import {
  INVALID,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/libs/constants';
import db from '@/libs/db';
import bcrypt from 'bcrypt';
import { saveLoginSession } from '@/libs/session';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string({
      invalid_type_error: `이메일은 ${INVALID.STRING}`,
      required_error: `이메일을 ${INVALID.INPUT}`,
    })
    .trim()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, '해당 이메일로 가입된 회원이 없습니다.'),
  password: z
    .string()
    .trim()
    .min(PASSWORD_MIN_LENGTH, INVALID.TOO_SHORT)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    // 사용자를 찾았다면 암호화된 비밀번호 검사
    const user = await db.user.findUnique({
      where: { email: result.data.email },
      select: { id: true, password: true },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? 'xxxx');

    if (ok) {
      await saveLoginSession(user!); // 로그인
    } else {
      return {
        fieldErrors: {
          password: ['비밀번호가 틀립니다.'],
          email: [],
        },
      };
    }
  }
};
