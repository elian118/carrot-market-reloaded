'use server';

import { getSession } from '@/libs/session';

// 현재 접속자가 제품 소유자인지 여부 확인
export const getIsOwner = async (userId: number) => {
  const { id } = await getSession();
  return id ? id === userId : false;
};
