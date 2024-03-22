'use server';

import { z } from 'zod';
import {
  INVALID,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/libs/constants';

const formSchema = z.object({
  email: z
    .string({
      invalid_type_error: `이메일은 ${INVALID.STRING}`,
      required_error: `이메일을 ${INVALID.INPUT}`,
    })
    .trim()
    .email()
    .toLowerCase(),
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

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
