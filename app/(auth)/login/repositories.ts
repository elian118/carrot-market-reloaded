import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const getUserWithEmail = async (email: string) => {
  const result = await db.user.findUnique({
    where: { email },
    select: { id: true, password: true },
  });
  setQueryLog('이메일 회원 조회', 'getUserWithEmail', result);
  return result;
};
