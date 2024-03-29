import { z } from 'zod';
import {
  INVALID,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/libs/constants';
import { getUserWithEmail } from '@/app/(auth)/login/repositories';

const checkEmailExists = async (email: string) => {
  const user = await getUserWithEmail(email);
  return Boolean(user);
};

export const formSchema = z.object({
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
