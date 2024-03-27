import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const getUserWithEmail = async (email: string) => {
  setQueryLog('이메일 회원 조회');
  return db.user.findUnique({
    where: { email },
    select: { id: true, password: true },
  });
};
