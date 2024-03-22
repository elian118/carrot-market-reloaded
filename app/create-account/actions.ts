'use server';
import { z } from 'zod';
import { INVALID } from '@/app/create-account/constants';
import { hasSlang, isValidPw } from '@/app/create-account/utils';

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: `이름은 ${INVALID.STRING}`,
        required_error: `이름을 ${INVALID.INPUT}`,
      })
      .min(3, INVALID.TOO_SHORT)
      .max(10, INVALID.TOO_LONG)
      // 그 외 유효성 검사 규칙과 메시지 추가 - refine, regex
      .regex(hasSlang(), '이름에 비속어가 포함돼 있습니다.'),
    email: z.string().email(INVALID.EMAIL),
    password: z.string().min(10, INVALID.TOO_SHORT),
    confirm_password: z.string().min(10, INVALID.TOO_SHORT),
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
    console.error(result.error.flatten());
    return result.error.flatten();
  }
};
