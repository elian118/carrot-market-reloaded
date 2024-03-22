'use server';

import { z } from 'zod';
import { INVALID } from '@/libs/constants';
import { hasSlang, isValidPw } from '@/app/create-account/utils';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/libs/constants';

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
  .refine(({ password, confirm_password }) => isValidPw({ password, confirm_password }), {
    message: '입력된 비밀번호가 서로 다릅니다.',
    path: ['confirm_password'],
  });

export const createAccount = (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
