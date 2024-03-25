'use server';

import { z } from 'zod';
import {
  INVALID,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/libs/constants';
import { hasSlang, isValidPw } from '@/app/(auth)/create-account/utils';
import db from '@/libs/db';
import bcrypt from 'bcrypt';
import { saveLoginSession } from '@/libs/session';

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: `이름은 ${INVALID.STRING}`,
        required_error: `이름을 ${INVALID.INPUT}`,
      })
      .trim()
      .min(3, INVALID.TOO_SHORT)
      .max(10, INVALID.TOO_LONG)
      .toLowerCase()
      // 그 외 유효성 검사 규칙과 메시지 추가 - refine, regex
      .regex(hasSlang, '비속어는 허용되지 않습니다.')
      .transform((username) => username.replaceAll('-', '')),
    email: z.string().email(INVALID.EMAIL).trim().toLowerCase(),
    password: z
      .string()
      .trim()
      .min(PASSWORD_MIN_LENGTH, INVALID.TOO_SHORT)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH, INVALID.TOO_SHORT).trim(),
  })
  .superRefine(async (data, ctx) => {
    const user = await db.user.findUnique({
      where: { username: data.username },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용중인 이름입니다.',
        path: ['username'],
        fatal: true, // 이슈 발생 시 다음 유효성 검사 실행 안 함
      });
    }
  })
  .superRefine(async (data, ctx) => {
    const user = await db.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '해당 이메일로 가입된 회원이 이미 존재합니다.',
        path: ['email'],
        fatal: true, // 이슈 발생 시 다음 유효성 검사 실행 안 함
      });
    }
  })
  .refine(({ password, confirm_password }) => isValidPw({ password, confirm_password }), {
    message: '입력된 비밀번호가 서로 다릅니다.',
    path: ['confirm_password'],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = await formSchema.spa(data); // spa Alias of safeParseAsync

  if (!result.success) {
    return result.error.flatten();
  } else {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    // 데이터베이스에 사용자 정보 저장
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: { id: true },
    });

    // 로그인
    await saveLoginSession(user);
  }
};
