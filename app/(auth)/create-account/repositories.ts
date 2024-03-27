import { setQueryLog } from '@/libs/utils';
import db from '@/libs/db';

export const createUser = async (data: any, hashedPassword: string) => {
  const result = await db.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
    select: { id: true },
  });
  setQueryLog('회원 가입 / 계정 생성', createUser.name, result);
  return result;
};

export const getUserIdWithEmail = async (email: string) => {
  const result = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  setQueryLog('이메일로 회원 조회', getUserIdWithEmail.name, result);
  return result;
};

export const getUserIdWithUsername = async (username: string) => {
  const result = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  setQueryLog('이름으로 회원 조회', getUserIdWithUsername.name, result);
  return result;
};
