'use server';

import bcrypt from 'bcrypt';
import { saveLoginSession } from '@/libs/session';
import { getUserWithEmail } from '@/app/(auth)/login/repositories';
import { formSchema } from '@/app/(auth)/login/schemas';

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log('dd');
    // 사용자를 찾았다면 암호화된 비밀번호 검사
    const user = await getUserWithEmail(result.data.email);
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
