import bcrypt from 'bcrypt';
import { saveLoginSession } from '@/libs/session';
import {
  createUser,
  getUserIdWithEmail,
  getUserIdWithUsername,
} from '@/app/(auth)/create-account/repositories';
import { z } from 'zod';

export const signIn = async (data: any) => {
  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(data.password, 12);

  // 데이터베이스에 사용자 정보 저장
  const user = await createUser(data, hashedPassword);

  // 로그인
  await saveLoginSession(user);
};

export const isExistUser = async (
  data: any,
  ctx: z.RefinementCtx,
  flag: 'email' | 'username',
) => {
  const user =
    flag === 'email'
      ? await getUserIdWithEmail(data.email)
      : await getUserIdWithUsername(data.username);
  if (user) {
    ctx.addIssue({
      code: 'custom',
      message:
        flag === 'email'
          ? '해당 이메일로 가입된 회원이 이미 존재합니다.'
          : '이미 사용중인 이름입니다.',
      path: [flag === 'email' ? 'email' : 'username'],
      fatal: true, // 이슈 발생 시 다음 유효성 검사 실행 안 함
    });
  }
};
