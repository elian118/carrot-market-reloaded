import { setQueryLog } from '@/libs/utils';
import db from '@/libs/db';

export const createUser = async (data: any, hashedPassword: string) => {
  setQueryLog('회원 가입 / 계정 생성');
  return db.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
    select: { id: true },
  });
};
